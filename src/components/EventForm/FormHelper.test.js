import * as FormHelper from "./FormHelper";

const mockCoordinatorsList = [
  {
    id: 0,
    name: "Daniel",
    lastname: "Mitchell",
    email: "daniel.mitchell@hussa.rs"
  },
  {
    id: 1,
    name: "Albert",
    lastname: "Alexander",
    email: "albert.alexander@hussa.rs"
  },
  {
    id: 2,
    name: "Philip",
    lastname: "Hughes",
    email: "philip.hughes@hussa.rs"
  }
];

const parsedCoordinatorList = [
  {
    id: 0,
    name: "Daniel Mitchell"
  },
  {
    id: 1,
    name: "Albert Alexander"
  },
  {
    id: 2,
    name: "Philip Hughes"
  }
];

const mockDateTimeInput = {
  date: "2019-02-18",
  time: "11:00",
  meridiem: "PM"
};

const mockFormData = {
  category: "2",
  date: "2019-02-18",
  description: "Test description",
  duration: "10",
  email: "test@email.com",
  fee: "50",
  meridiem: "PM",
  paid_event: "PAID",
  responsible: "3",
  reward: "10",
  time: "11:00",
  title: "Test title"
};

const parsedEventData = {
  category_id: 2,
  coordinator: { id: "3", email: "test@email.com" },
  date: "2019-02-18T23:00",
  description: "Test description",
  duration: 36000,
  event_fee: 50,
  paid_event: true,
  reward: 10,
  title: "Test title"
};

describe("FormHelper parseCoordinators", () => {
  it("should parse list of 3 coordinators", () => {
    expect(FormHelper.parseCoordinators(mockCoordinatorsList)).toEqual(
      parsedCoordinatorList
    );
  });

  it("should parse empty", () => {
    expect(FormHelper.parseCoordinators([])).toEqual([]);
  });
});

describe("FormHelper parseDateTime", () => {
  it("should parse input to datetime string", () => {
    expect(FormHelper.parseDateTime(mockDateTimeInput)).toEqual(
      "2019-02-18T23:00"
    );
  });
});

describe("FormHelper parseFormData", () => {
  it("should parse form data to event data", () => {
    expect(FormHelper.parseFormData(mockFormData)).toEqual(parsedEventData);
  });
});
