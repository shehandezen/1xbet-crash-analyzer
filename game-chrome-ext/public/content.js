window.onload = () => {
    const config = {
        lastID: 0,

    }


    const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    const inputEvent = new Event('input', { bubbles: true });
    const changeEvent = new Event('change', { bubbles: true });

    const keydownEvent = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'space',
        char: 'space',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false
    });

    const keyupEvent = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        key: 'space',
        char: 'space',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        let message = JSON.parse(request.message)
        const iframe = document.querySelector("#maincontent > div.xgames > div > div > iframe")
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const autobetSelect = innerDoc.querySelector("#games_page > div.crash.games-container__game > div > div > div.crash__wrap.crash__wrap--main > div.crash__wrap.crash__wrap--bottom > div.crash__bet.crash-bet > div > button:nth-child(2)")
        const baseStakeInput = innerDoc.querySelector("#crash-bet-base")
        const maxStakeInput = innerDoc.querySelector("#crash-bet-limit")
        const autoOdd = innerDoc.querySelector("#crash-bet-cashout")
        const startAuto = innerDoc.querySelector("#games_page > div.crash.games-container__game > div > div > div.crash__wrap.crash__wrap--main > div.crash__wrap.crash__wrap--bottom > div.crash__bet.crash-bet > form:nth-child(3) > button:nth-child(2)")
        const stopAuto = innerDoc.querySelector("#games_page > div.crash.games-container__game > div > div > div.crash__wrap.crash__wrap--main > div.crash__wrap.crash__wrap--bottom > div.crash__bet.crash-bet > form:nth-child(3) > button:nth-child(3)")


        let ClickDelay = (Math.random() * (1000 - 100) + 100)
        let inputDelay = (Math.random() * (1000 - 100) + 100) + ClickDelay
        let betDelay = (Math.random() * (1000 - 100) + 100) + inputDelay

        if (message.header == 'BET') {
            setTimeout(function () {
                autobetSelect.dispatchEvent(clickEvent);
                baseStakeInput.autocomplete = 'on'
                maxStakeInput.autocomplete = 'on'
                autoOdd.autocomplete = 'on'
                autoOdd.click()
            }, ClickDelay);

            setTimeout(function () {

                autoOdd.click()
                autoOdd.focus()
                autoOdd.setAttribute('value', `${message.data?.odd}`)
                autoOdd.value = `${message.data?.odd}`
                autoOdd.dispatchEvent(inputEvent);
                autoOdd.dispatchEvent(changeEvent);
                baseStakeInput.dispatchEvent(keydownEvent)
                baseStakeInput.dispatchEvent(keyupEvent)
                baseStakeInput.dispatchEvent(changeEvent);
                autoOdd.blur();

                maxStakeInput.focus()
                maxStakeInput.setAttribute('value', `${(Math.round(parseInt(message.data?.stake))) + 1}`)
                maxStakeInput.dispatchEvent(inputEvent);
                maxStakeInput.dispatchEvent(changeEvent);
                maxStakeInput.blur();


                baseStakeInput.focus()
                baseStakeInput.setAttribute('value', `${Math.round(parseInt(message.data?.stake))}`);
                baseStakeInput.value = `${Math.round(parseInt(message.data?.stake))}`
                console.log(baseStakeInput.value)
                baseStakeInput.dispatchEvent(inputEvent);
                baseStakeInput.dispatchEvent(changeEvent);
                baseStakeInput.dispatchEvent(keydownEvent)
                baseStakeInput.dispatchEvent(keyupEvent)
                baseStakeInput.dispatchEvent(changeEvent);
                baseStakeInput.blur();

            }, inputDelay);

            setTimeout(function () {
                startAuto.dispatchEvent(clickEvent);
            }, betDelay);

        }

        if (message.header == 'CRASH') {

            if (stopAuto) {
                stopAuto.dispatchEvent(clickEvent);
            }

            setTimeout(() => {
              try { let dataRecord = innerDoc.querySelector("#games_page > div.crash.games-container__game > div > div > div.crash__wrap.crash__wrap--main > div.crash__wrap.crash__wrap--bottom > div.crash-history.crash__history > div.crash-history__main.scrollbar > div:nth-child(2)").children
                console.log(dataRecord, 'bet record')
                let record = []
                for (let i of dataRecord) {
                    console.log(i.innerText)
                    record.push(i.innerText)
                }

                
                let result = { header: 'RESULT', data: { date: record[0], time: record[1], roundID: record[2], bet: record[3]?.slice(0, -4), odd: parseFloat(record[4]?.slice(1, -1)), win: record[5]?.slice(0, -4), crash: parseFloat(record[6]?.slice(1, -1)) } }
                if(config.lastID != result.data.roundID){
                    chrome.runtime.sendMessage(result, (response) => {
                        config.lastID = result.data.roundID
                     })
                }}
                catch(err){
                    console.log('Bet result sending issue: ', err.message)
                }
               

            }, 1500)



        }
    })
}


setInterval(() => {

    const iframe = document.querySelector("#maincontent > div.xgames > div > div > iframe")
    const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    const waitConnection = innerDoc.querySelector("#app > div.waiting-connection")
    const balance = document.querySelector("#user-money > div > div.user-money_balance.base-balance > a > div > p").innerText
console.log(balance)
    if (!waitConnection) {
        chrome.runtime.sendMessage({ header: 'WEBSTATS', data: { status: 'LIVE', balance: balance } })
    } else {
        chrome.runtime.sendMessage({ header: 'WEBSTATS', data: { status: 'DISCONNECTED' } })
    }

}, 3000)