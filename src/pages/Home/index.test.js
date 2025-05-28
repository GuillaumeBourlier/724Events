import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

// MOCK du contexte de données
jest.mock("../../contexts/DataContext", () => ({
  useData: () => ({
    data: {
      events: [
        {
          id: 1,
          cover: "/images/last-event.jpg",
          title: "Soirée de lancement",
          date: "2024-05-01T00:00:00Z",
          type: "Corporate",
        },
        {
          id: 2,
          cover: "/images/event2.jpg",
          title: "Conférence annuelle",
          date: "2024-06-15T00:00:00Z",
          type: "Business",
        },
      ],
    },
    last: {
      cover: "/images/last-event.jpg",
      title: "Soirée de lancement",
      date: "2024-05-01T00:00:00Z",
      type: "Corporate",
    },
    error: null,
  }),
}));

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

// TESTS de la page d'accueil
describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);
    const titles = await screen.findAllByText("Nos réalisations");
    expect(titles.length).toBeGreaterThan(0);
  });

  it("a list of people is displayed", async () => {
    render(<Home />);
    const samira = await screen.findByText("Samira");
    const alice = await screen.findByText("Alice");
    expect(samira).toBeInTheDocument();
    expect(alice).toBeInTheDocument();
  });

  it("a footer is displayed", async () => {
    render(<Home />);
    expect(await screen.findByText("Contactez-nous")).toBeInTheDocument();
    expect(
      await screen.findByText("Notre derniére prestation")
    ).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);
    const successTitle = await screen.findByText("Notre derniére prestation");
    const eventTitles = await screen.findAllByText("Soirée de lancement");
    expect(successTitle).toBeInTheDocument();
    expect(eventTitles.length).toBeGreaterThan(0); // ou `toBe(1)` si un seul attendu
  });
});
