import { render, screen } from "@testing-library/react";
import { DataProvider, api, useData } from "./index";

describe("When a data context is created", () => { // Début du groupe de tests pour le contexte de données
  it("a call is executed on the events.json file", async () => { // Teste si l'appel à l'API est bien fait
    api.loadData = jest.fn().mockReturnValue({ result: "ok" }); // On simule la fonction api.loadData pour qu'elle retourne un objet { result: "ok" }
    const Component = () => { // Définition d'un composant de test
      const { data } = useData(); // On récupère la donnée du contexte via le hook useData
      return <div>{data?.result}</div>; // On affiche la propriété "result" de l'objet data dans une div
    };
    render(
      <DataProvider> {/* On englobe le composant de test avec le DataProvider pour fournir le contexte */}
        <Component />
      </DataProvider>
    );
    const dataDisplayed = await screen.findByText("ok"); // On attend que le texte "ok" apparaisse à l'écran
    expect(dataDisplayed).toBeInTheDocument(); // On vérifie que ce texte est bien présent dans le DOM
  });
  describe("and the events call failed", () => {
    it("the error is dispatched", async () => {
      window.console.error = jest.fn();
      api.loadData = jest.fn().mockRejectedValue("error on calling events");

      const Component = () => {
        const { error } = useData();
        return <div>{error}</div>;
      };
      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );
      const dataDisplayed = await screen.findByText("error on calling events");
      expect(dataDisplayed).toBeInTheDocument();
    });
  });
  it("api.loadData", () => {
    window.console.error = jest.fn();
    global.fetch = jest.fn().mockResolvedValue(() =>
      Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
      })
    );
    const Component = () => {
      const { error } = useData();
      return <div>{error}</div>;
    };
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );
  });
});
