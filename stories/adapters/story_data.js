export let requestData = [
  {
    data: {
      slug: "ABCDESDDESS",
      first_name: "Shola",
      last_name: "Ameobi",
      email: "james@example.com",
      number: "08033002232",
      budget: 4000,
      request_subjects: ["IELTS"],
      tutor: "Chidiebere",
      status: "pending",
      created: "2018-10-12 14:10:33",
      modified: "2018-10-12 14:10:33",
      request_info: {
        request_details: {
          schedule: {
            summary: "March Standard Class -Ikeja"
          }
        }
      }
    },
    remark: [
      {
        slug: "ABCDESDDESS",
        body: "Sent a message to the client to approve lessons",
        updated: "2018-03-09 12:30PM"
      }
    ]
  },
  {
    data: {
      slug: "ABCDESDDESO",
      first_name: "Shola",
      last_name: "Ameobi",
      email: "james@example.com",
      number: "08033002232",
      budget: 4000,
      request_subjects: ["IELTS"],
      tutor: "Chidiebere",
      status: "payed",
      created: "2018-10-12 14:10:33",
      modified: "2018-10-12 14:10:33",
      request_info: {
        request_details: {
          schedule: {
            summary: "March Standard Class -Ikeja"
          }
        }
      }
    },
    remark: [
      {
        slug: "ABCDESDDESO",
        body: "Sent a message to the client to approve lessons",
        updated: "2018-03-09 12:30PM"
      }
    ]
  },
  {
    data: {
      slug: "ABCDESDDESD",
      first_name: "Shola",
      last_name: "Ameobi",
      email: "james@example.com",
      number: "08033002232",
      budget: 4000,
      request_subjects: ["IELTS"],
      tutor: "Chidiebere",
      status: "payed",
      created: "2018-10-12 14:10:33",
      modified: "2018-10-12 14:10:33",
      request_info: {
        request_details: {
          schedule: {
            summary: "March Standard Class -Ikeja"
          }
        }
      },
      booking: {}
    },
    remark: [
      {
        slug: "ABCDESDDESD",
        body: "Sent a message to the client to approve lessons",
        updated: "2018-03-09 12:30PM"
      }
    ]
  }
];

export let requestLoadingData = [
  {
    slug: "ABCDESDDESTT",
    full_name: "Shola Ameobi",
    email: "james@example.com",
    phone_no: "08033002232",
    skill: "IELTS",
    budget: 20000,
    request_type: 1,
    tutor: "Chidiebere",
    status: "pending",
    created: "2018-10-12 14:10:33",
    modified: "2018-10-12 14:10:33"
  },
  {
    slug: "ABCDESDDESS",
    first_name: "Shola",
    last_name: "Ameobi",
    email: "james@example.com",
    number: "08033002232",
    budget: 4000,
    request_subjects: ["IELTS"],
    request_type: 5,
    tutor: "Chidiebere",
    status: "pending",
    created: "2018-10-12 14:10:33",
    modified: "2018-10-12 14:10:33",
    request_info: {
      request_details: {
        schedule: {
          summary: "March Standard Class -Ikeja"
        }
      }
    }
  },
  {
    slug: "ABCDESDDESO",
    first_name: "Shola",
    last_name: "Ameobi",
    email: "james@example.com",
    number: "08033002232",
    request_type: 5,
    budget: 4000,
    request_subjects: ["IELTS"],
    tutor: "Chidiebere",
    status: "payed",
    created: "2018-10-12 14:10:33",
    modified: "2018-10-12 14:10:33",
    request_info: {
      request_details: {
        schedule: {
          summary: "March Standard Class -Ikeja"
        }
      }
    }
  }
];

export let groupBookingList = [
  {
    skill: "IELTS",
    no_of_students: 20,
    amount: 200000,
    status: "scheduled",
    schedule: "January Standard Class Ikeja",
    first_session: "2019-01-10",
    last_session: "2019-01-31",
    tutor: { first_name: "Chidiebere" },
    order: "AADDESSDES",
    created: "2019-01-10"
  },
  {
    skill: "IELTS",
    no_of_students: 20,
    amount: 200000,
    status: "completed",
    schedule: "January Weekend Class Ikeja",
    first_session: "2019-01-10",
    last_session: "2019-01-31",
    tutor: { first_name: "Chidiebere" },
    order: generateSlug(),
    created: "2019-01-10"
  },
  {
    skill: "IELTS",
    no_of_students: 20,
    amount: 200000,
    status: "initialized",
    schedule: "January Standard Class Gbagada",
    first_session: "2019-01-10",
    last_session: "2019-01-31",
    tutor: { first_name: "Chidiebere" },
    order: generateSlug(),
    created: "2019-01-10"
  },
  {
    skill: "IELTS",
    no_of_students: 20,
    amount: 200000,
    status: "scheduled",
    schedule: "January Weekend Class Gbagada",
    first_session: "2019-01-10",
    last_session: "2019-01-31",
    tutor: { first_name: "Chidiebere" },
    order: generateSlug(),
    created: "2019-01-01"
  },
  {
    skill: "IELTS",
    no_of_students: 20,
    amount: 200000,
    status: "scheduled",
    schedule: "Febuary Standard Class Ikeja",
    first_session: "2019-01-10",
    last_session: "2019-01-31",
    tutor: { first_name: "Chidiebere" },
    order: generateSlug(),
    created: "2019-02-10"
  }
];

export function generateSlug(slugLength = 12) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < slugLength; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
