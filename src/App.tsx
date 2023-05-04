/*
	Potrebno je napraviti React hook za filtriranje, sortiranje i pretrazivanje podataka.
	Hook treba da prima array objekata odredjene strukture. U ovom slucaju koristimo array user-a iz users.json fajla.
	Hook treba da vraca formatirane podatke kao i funkcije za sortiranje, pretrazivanje i filtriranje.
  Omoguciti ulancano pozivanje implementiranih funkcija.
	
	Funkcija za pretrazivanje prima string i pretrazuje sve propertije na user objektu.
	Funkcija za filtriranje prima funkciju koju poziva za svaki entry u array-u.
	Funkcija za sortiranje moze da primi string (property name) po kojem treba da odradi standardni sort
	ili da primi funkciju za sortiranje (slicno kao i filter funkcija).

	Za zadatak kreirati poseban projekat gdje ce sadrzaj App.tsx fajla biti ovaj fajl.
	
	Koristiti React i TypeScript.

	Puno srece ;-)
*/

import { useEffect } from "react";
import users from "./users.json";
import { useFormattedData } from "./useFormattedData";

const App = () => {

  const { formatted, sortBy, filter, search } = useFormattedData(users);

  /**
   * Unutar ovog useEffect poziva bice proizvoljnim redom pozivane implementirane funkcije za
   * search, filter i sort da bi testirali tvoju implementaciju.
   */
  useEffect(() => {
    search("Female");
    filter(({ zip }) => zip > 850);
    sortBy("firstName");
    // sortBy((a, b) => -1);
  }, []);



  return (
    <div>
      {formatted.map(({ id, firstName, lastName, birthdate }) => (
        <div style={{margin: '8px'}} key={id}>
          <div>
            {firstName} {lastName}
          </div>
          <div>{birthdate}</div>
        </div>
      ))}
    </div>
  );
};


export default App;
