import Country from './Country'

const Countries = (props) => {

    const { countriesToShow, setFilter } = props


    // RENDER COUNTRIES BASED ON NUMBER OF COUNTRIES TO SHOW (based on filter):

    // a) 0 countries (ex. on 1st render) - return null:
    if (countriesToShow.length === 0) {
        return null
    }

    // b) more than 10 countries - print information to specify another filter:
    if (countriesToShow.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    // c) 1-10 countries - return just name of country and the button to show it
    if (countriesToShow.length > 1) {
        return (
            <div>
                {countriesToShow.map(country =>
                    <div key={country.name}>
                        {country.name} <button onClick={() => setFilter(country.name)}>show</button>
                    </div>
                )}
            </div>
        )
    }
    // d) exactly 1 country - show information about it
    if (countriesToShow.length === 1) {
        const country = countriesToShow[0]

        return <Country country={country} />
    }
}

export default Countries
