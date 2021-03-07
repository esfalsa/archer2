# Archer
Archer is a user-friendly endorsement tool for the online game NationStates. It generates a field of buttons that allows a player to give their endorsement to every other player in their region that they've not yet endorsed.

# Configuration
Archer is just a set of HTML files powered by Javascript. To actually deliver data, it requires an API endpoint. It was designed with [Trove](https://github.com/hierocles/trove) in mind, but any API that returns a JSON array of nation names will work.

Edit `config.example.js` in the `lib` folder to set your API endpoint and rename the file to `config.js`.

If using Trove, your `API_URL` constant would be:
```
const API_URL = "https://trove.example.com/api/endotart/";
```

# Customization
Archer is built using the [Bulma](https://github.com/jgthms/bulma) CSS framework and [jQuery](https://github.com/jquery/jquery), so customization is incredibly easy. No fancy Vue or React here.

All logic is in `lib/main.js` and should be straight-forward. For development, [bulma-start](https://github.com/jgthms/bulma-start) is a good starting point.
