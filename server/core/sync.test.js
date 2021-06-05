const RSSParser = require("rss-parser");
const { processFeed } = require("./sync");
const nasaFixture = require("../../fixtures/nasa");
const { putArticle } = require("./articles");

jest.mock("rss-parser");
jest.mock("./articles");

jest.setSystemTime(new Date("2021-06-05T15:48:28.305Z"));

describe("processFeed", () => {
  describe("syncing an example feed (nasa)", () => {
    beforeAll(() => {
      putArticle.mockReset();
      RSSParser.prototype.parseURL = jest.fn(() => nasaFixture);
      processFeed({ url: "nasa", id: "nasa" });
    });

    it("creates the first article", () => {
      expect(putArticle).toHaveBeenCalledWith({
        author: null,
        commentsLink: undefined,
        content:
          "NASA has awarded $1.2 million to nine universities and organizations across the country for research and technology development projects in areas critical to the agency’s mission, including studying radiation effects and growing food for long-duration space travel.",
        feedId: "nasa",
        guid: "http://www.nasa.gov/press-release/nasa-awards-universities-12m-for-space-station-suborbital-research",
        link: "http://www.nasa.gov/press-release/nasa-awards-universities-12m-for-space-station-suborbital-research",
        publishedAt: "2021-06-04T19:04:00.000Z",
        title:
          "NASA Awards Universities $1.2M for Space Station, Suborbital Research",
      });
    });

    it("creates the second article", () => {
      expect(putArticle).toHaveBeenCalledWith({
        author: null,
        commentsLink: undefined,
        content:
          "NASA Administrator Bill Nelson released the following statement after an introductory call Friday with Roscosmos General Director Dmitry Rogozin:",
        feedId: "nasa",
        guid: "http://www.nasa.gov/press-release/nasa-administrator-statement-on-meeting-with-roscosmos",
        link: "http://www.nasa.gov/press-release/nasa-administrator-statement-on-meeting-with-roscosmos",
        publishedAt: "2021-06-04T17:35:00.000Z",
        title: "NASA Administrator Statement on Meeting with Roscosmos",
      });
    });

    it("created the correct number of articles", () => {
      expect(putArticle).toHaveBeenCalledTimes(9);
    });
  });
});
