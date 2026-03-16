export const fakeLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.includes("@") && password.length >= 4) {
        resolve({ email, token: "fake-jwt-" + Date.now() });
      } else {
        reject("Invalid email or password");
      }
    }, 700);
  });
};

export const fetchProjectsAPI = () => {
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

export const createProjectAPI = (project) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...project, id: Date.now() }), 500);
  });
};

export const updateProjectAPI = (project) => {
  return new Promise((resolve) => resolve(project), 400);
};

export const getTasksAPI = (projectId) => {
  const tasksData = {
    1: [
      {
        id: 101,
        title: "Design new UI",
        assignee: "Alice",
        priority: "High",
        completed: false,
      },
      {
        id: 102,
        title: "Implement login",
        assignee: "Bob",
        priority: "Medium",
        completed: true,
      },
    ],
    2: [
      {
        id: 201,
        title: "Payment gateway",
        assignee: "Charlie",
        priority: "High",
        completed: true,
      },
    ],
    3: [
      {
        id: 301,
        title: "Train ML model",
        assignee: "Dana",
        priority: "High",
        completed: false,
      },
    ],
  };
  return new Promise((resolve) =>
    setTimeout(() => resolve(tasksData[projectId] || []), 400),
  );
};

export const toggleTaskAPI = (task) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...task, completed: !task.completed }), 300);
  });
};
