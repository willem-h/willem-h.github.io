---
layout: post
title: "Formula 1 Live Results using AWS Lambda, Telegram, and Sportmonks"
date: 2023-04-03
---

This weekend I went to the Australian F1 Grand Prix in Melbourne and I loved it. 

The mobile networks, however, did not love it. The record breaking crowd pushed
the networks to their limits. The official F1 app struggled to load and it made
it hard to keep up with what was happening on track. 

I went to the qualifying on the Saturday and first noticed the issue then. There
were screens available, but for GA tickets it was hard to get a view of the
track and a screen at the same time. And I was there to see the on-track action. 

Walking home from the train station after qualifying I wondered if I could build
something to help. Turns out I could using these tools:

- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS EventBridge Scheduler](https://aws.amazon.com/eventbridge/scheduler/)
- [Telegram Bot](https://core.telegram.org/bots/api)
- [Sportmonks’ F1 API](https://www.sportmonks.com/formula-one-api/)

Here's how I did it.

Finding the Sportmonks API was the foundation for making this work. It provides
a live results while a race is happening and can return a bunch of different
options like team and driver info in the one request. It's a nicely designed
interface though the documentation could be improved. It comes with a 14 day
free trial and after that it becomes about $120/month.

The next step was delivering the information to my phone. I originally wanted to
do this via SMS so that I could avoid the mobile internet networks completely
and hopefully have a higher deliverability. This was all working with
assumptions I've learned while in remote areas on 2G networks and hoping they'd
hold up in high demand environments. There was one issue with this though.
Australia has quite strong regulations for getting access to mobile numbers and
the process to get one can take more time than I was willing to give it. This
also means the providers charge more for the privilege. Amazon has their SNS
service to accomplish this but without verification I could only send 30
messages. For an action packed race that runs for a minimum of 120mins that
wasn't going to cut it.

Enter Telegram. I'd messed around with Telegram in the past and remembered they
made some bold claims about how fast they deliver messages. I decided to take
them at their word and give it a shot. It helped a lot that their APIs are open
and free. It didn't help however that their documentation is tricky to parse. I
turned to ChatGPT to give me an example of sending a message and it worked.

AWS Lambda is the tool I used to glue the Sportmonks API to Telegram. I've been
using it over the last couple of weeks to build [another project]({% post_url 2023-03-10-openshelf-in-2023 })
of mine. I then used AWS EventBridge Scheduler like a cron service and set it to
invoke the Lambda function I'd written every minute.

The Lambda function itself is faily simple. It first requests the information
from Sportmonks. If there isn't any data it sends a message saying that "No race
live", otherwise it continues and pulls the information it needs and structures
a message to be sent.

```javascript
import fetch from 'node-fetch'

const SPORTMONKS_TOKEN = process.env.SPORTMONKS_TOKEN
const TELEGRAM_ACCESS_CODE = process.env.TELEGRAM_ACCESS_CODE
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export const handler = async () => {
    let data = {}

    try {
        const response = await fetch(`https://f1.sportmonks.com/api/v1.0/livescores/now?api_token=${SPORTMONKS_TOKEN}`)
        data = await response.json()
        console.log(data)
    }
    catch (error) {
        console.error('Error retrieving SportMonks info', error)
        return { error: true }
    }

    const sendMessage = async (message) => {
        try {
            const response = await fetch(`https://api.telegram.org/bot${accessCode}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message
                })
            })
            const data = await response.json()
            console.log('Message sent to Telegram')
        }
        catch (error) {
            console.error('Error sending to Telegram', error)
        }
    }
    
    if (data && !data.data) {
        sendMessage("No race live.")
        return {}
    }
    
    const race = data.data[0]
    const city = race.city
    const totalLaps = race.total_laps

    // Get list of driver positions
    let drivers = race.results.data

    // Sort drivers based on track position because the order isn't guaranteed
    drivers = drivers.sort((a, b) => {
        if (a.position > b.position) return 1
        if (a.position < b.position) return -1
        if (a.position === b.position) return 0
    })

    // Get lap number from lead driver
    const lapCount = drivers[0].laps

    // First line of the message. Becomes the initialisation for the accumulator
    const firstLine = `${city} Lap: ${lapCount}/${totalLaps}`

    // Reduce is a neat way of combining the necessary information into one
    // string that can then be delivered as a message.
    const message = drivers.reduce((partialMessage, driver) => {
        const position = driver.position
        const driver = driver.driver.data.short_name
        const lap_time = driver.driver_time
        const interval = driver.driver_time_int
        const line = `\n${position}. ${driver} ${lap_time} ${interval}`
        return partialMessage + line 
    }, firstLine)
   
    sendMessage(message)

    return {}
}
```

The final message looks something like this:

```
Melbourne Lap: 34/58
1. VER 1:21.819 1:21.819
2. HAM 1:30.528 +8.709
3. ALO 1:32.220 +10.401
4. SAI 1:33.567 +11.748
5. GAS 1:34.466 +12.647
6. STR 1:35.666 +13.847
7. HUL 1:38.165 +16.346
8. NOR 1:40.261 +18.442
9. PER 1:42.040 +20.221
10. OCO 1:48.845 +27.026
11. PIA 1:54.502 +32.683
12. TSU 1:57.979 +36.160
13. ZHO 1:58.734 +36.915
14. MAG 1:59.302 +37.483
15. SAR 2:10.212 +48.393
16. BOT 2:10.911 +49.092
17. DEV 2:17.251 +55.432
18. LEC null 
19. RUS DNF +17LAPS
20. ALB DNF +27LAPS
```

A few things I would improve are:

- Revisit SMS as the delivery method
- Calculate driver's lap times based on their own laps rather than the lead
  driver
- Calculate the interval time based on the driver ahead
- Save the previous positions to calculate places that have changed since the
  previous message
- Allow others to sign up. Because the chat ID is hard-coded it only works for
  me

Overall I'm really happy with how it worked. It kept me updated with what was
happening on track while enjoying the real-life experience. Plus it was a fun
project to pull off in a very limited amount of time and I've learned a lot in
the process 🎉

Would you use something like this? Let me know by emailing me at the address
below.
