import { useState } from 'react'
import ExchangeRate from './ExchangeRate'
import axios from 'axios'

const CurrencyConverter = () => {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA', 'SOL', 'LUNA']
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC')
    const [amount, setAmount] = useState(1)
    const [exchangedData, setExchangedData] = useState({
        primaryCurrency: 'BTC',
        secondaryCurrency: 'BTC',
        exchangeRate: 0,
        bidPrice: 0,
        askPrice: 0
    })
    const [result, setResult] = useState(0)

 

    const convert =  async () => { 

       
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
            }
        };
        
        await fetch(`https://alpha-vantage.p.rapidapi.com/query?from_currency=${chosenPrimaryCurrency}&function=CURRENCY_EXCHANGE_RATE&to_currency=${chosenSecondaryCurrency}`, options)
            .then(response => response.json())
            .then(response => {
              
            setResult(response['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
           
            setExchangedData({
                primaryCurrency: chosenPrimaryCurrency,
                secondaryCurrency: chosenSecondaryCurrency,
                exchangeRate: response["Realtime Currency Exchange Rate"]["5. Exchange Rate"],
                bidPrice: response["Realtime Currency Exchange Rate"]["8. Bid Price"],
                askPrice: response["Realtime Currency Exchange Rate"]["9. Ask Price"]
            })

            
        })
            .catch(err => console.error(err));


    }

    return (
        <div className="currency-converter">
            <h2>Currency Converter</h2>

            <div className="input-box">

                <table>
                    <tbody>
                    <tr>
                        <td>Primary Currency:</td>
                        <td>
                            <input
                                type="number"
                                name="currency-amount-1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </td>
                        <td>
                            <select
                                value={chosenPrimaryCurrency}
                                name="currency-option-1"
                                className="currency-options"
                                onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                            >
                                {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Secondary Currency:</td>
                        <td>
                            <input
                                name="currency-amount-2"
                                value={result}
                                disabled ={true}
                            />
                        </td>
                        <td>
                            <select
                                value={chosenSecondaryCurrency}
                                name="currency-option-2"
                                className="currency-options"
                                onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                            >
                                {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <button id="convert-button" onClick={convert}>Convert</button>


            </div>


            <ExchangeRate
                exchangedData={exchangedData}
            />
        </div>
    )
}

export default CurrencyConverter