const url = "http://localhost:4000";
export const Login = async (email: string, password: string) => {
  const res = await fetch(url + "/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) return await res.json();
  throw await res.json();
};

export const Registration = async (email: string, password: string) => {
  const res = await fetch(url + "/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) return await res.json();
  throw await res.json();
};

export const ChangeEmailApi = async (
  token: string,
  email: string,
  password: string
) => {
  const res = await fetch(url + "/change-email", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (res.ok) return await res.json();
  throw await res.json();
};

export const ChangePasswordApi = async (
  token: string,
  newPassword: string,
  oldPassword: string
) => {
  const res = await fetch(url + "/change-password", {
    method: "POST",
    body: JSON.stringify({ newPassword, oldPassword }),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (res.ok) return await res.json();
  throw await res.json();
};

export const SendCode = async (email: string, code: string) => {
  const res = await fetch(url + "/signup-confirm", {
    method: "POST",
    body: JSON.stringify({ email, code }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) return await res.json();
  throw await res.json();
};

export const RecoveryPassword = async (email: string) => {
  const res = await fetch(url + "/recovery", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) return await res.json();
  throw await res.json();
};

export const SendRecoveryCode = async (password: string, code: string) => {
  const res = await fetch(url + "/recovery-confirm", {
    method: "POST",
    body: JSON.stringify({ password, code }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) return await res.json();
  throw await res.json();
};

export const getBalance = async (token: string) => {
  const res = await fetch(url + "/balance", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  if (res.ok) return await res.json();
  throw res;
};

export const getTransactions = async (token: string) => {
  const res = await fetch(url + "/transactions", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();
  if (res.ok) return data;
  throw { status: res.status, message: data.message };
};

export const getTransactionItem = async (token: string, id: number) => {
  const res = await fetch(url + "/transaction?id=" + id, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();
  if (res.ok) return data;
  throw { status: res.status, message: data.message };
};

export const sendMoney = async (token: string, sum: number, email: string) => {
  const res = await fetch(url + "/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ email, sum }),
  });

  const data = await res.json();
  if (res.ok) return data;
  throw { status: res.status, message: data.message };
};
export const receiveMoney = async (
  token: string,
  sum: number,
  system: number
) => {
  const res = await fetch(url + "/receive", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ system, sum }),
  });

  const data = await res.json();
  if (res.ok) return data;
  throw { status: res.status, message: data.message };
};

export const getNotifications = async (token: string) => {
  const res = await fetch(url + "/notifications", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();
  if (res.ok) return data;
  throw { status: res.status, message: data.message };
};
