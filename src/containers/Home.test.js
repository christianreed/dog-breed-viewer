import React from "react";
import { shallow } from "enzyme";

import Home from "./Home";

describe('"configureBreedsArray" method', () => {
  let instance;

  beforeAll(() => {
    const wrapper = shallow(<Home />);
    instance = wrapper.instance();
  });

  it("Should handle an empty object", () => {
    expect(instance.configureBreedsArray({})).toEqual([]);
  });

  it("Should handle breeds without sub breeds", () => {
    expect(
      instance.configureBreedsArray({ lab: [], husky: [], mutt: [] })
    ).toContainEqual({ displayName: "lab", path: "lab" });
  });

  it("Should handle breeds with sub breeds", () => {
    expect(
      instance.configureBreedsArray({
        lab: ["brown", "black", "yellow"],
        husky: [],
        mutt: []
      })
    ).toContainEqual({ displayName: "yellow lab", path: "lab/yellow" });
  });

  it("Should ignore a sub breed with the wrong type", () => {
    expect(
      instance.configureBreedsArray({ lab: [true, false], husky: [] })
    ).toEqual([{ displayName: "husky", path: "husky" }]);
  });
});
