export const fakeLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password.length >= 4) {
        resolve({ email, token: "fake-jwt-token" });
      } else {
        reject("Invalid credentials");
      }
    }, 800);
  });
};

export const fetchProjects = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Mobile App Redesign",
          owner: "John Doe",
          status: "In Progress",
          progress: 65,
          created: "2025-02-10",
        },
        {
          id: 2,
          name: "E-commerce Platform",
          owner: "Sarah Lee",
          status: "Completed",
          progress: 100,
          created: "2025-01-15",
        },
        {
          id: 3,
          name: "AI Dashboard",
          owner: "Mike Chen",
          status: "In Progress",
          progress: 30,
          created: "2025-03-01",
        },
      ]);
    }, 600);
  });
};
