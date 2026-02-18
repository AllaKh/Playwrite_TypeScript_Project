export const config = {
  baseURL: 'https://automationintesting.online',

  auth: {
    username: 'admin',
    password: 'password',
},

invalidPasswords: [
  "",
  " ",
  "abc123",
  "' OR '1'='1",
  "admin' --",
  "' OR 1=1--",
  "' OR 'a'='a",
  "; DROP TABLE users; --",
  "<script>alert(1)</script>",
  "../../etc/passwd",
  "\\u202E",
  "null byte",
  "\\x00",
  "0xFFFFFFFF",
  ],
};
