# Currency Converter

В useEffect делаем запрос на https://www.cbr-xml-daily.ru/latest.js и обновляем стейт со ВСЕМИ курсами.

Далее setFromCurrency (и setToCurrency) и соотв. стейты для сохранения значений КОНКРЕТНОЙ валюты в блоке.

Передаём функцию смены валюты onChangeCurrency(), куда просто передаём setTo/FromCurrency.  
` <Block onChangeCurrency={setFromCurrency}`

В Block вызов при клике на валюту меняем стейт валюты.  
`<li onClick={() => onChangeCurrency(cur)} ... `

Дальше делаем состояние инпута кол-ва денег контролируемым.

Потом пишем функцию вычисления курсов.

Пишем useEffect для реакцию на смену валюты при НЕ смене кол-ва.

Переписываем хранение exchangeRates с useState на useRef (?). (Насколько это правомочно?)
