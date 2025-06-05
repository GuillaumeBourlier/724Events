import { render, screen } from "@testing-library/react";
import ModalEvent from "./index";

const data = {
  date: "2022-04-29T20:28:45.744Z",
  title: "Conférence #productCON",
  cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
  description:
    "Présentation des outils analytics aux professionnels du secteur",
  nb_guesses: 1300,
  periode: "24-25-26 Février",
  prestations: [
    "1 espace d’exposition",
    "1 scéne principale",
    "2 espaces de restaurations",
    "1 site web dédié",
  ],
};

describe("When Modal data is created", () => {
  it("a list of mandatories data is displayed", async () => {
    render(<ModalEvent event={data} />);

    expect(
      await screen.findByText(/1 espace d’exposition/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/29 avril 2022/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/Présentation des outils analytics/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/Conférence #productCON/i)
    ).toBeInTheDocument();
  });
});
