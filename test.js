//testcase.js
require("dotenv").config();
const axios = require("axios");

async function call() {
    const start = new Date();
  const res = await axios.post(
    `${process.env.URL}:${process.env.SERVER_PORT}/invoke`,
    {}
  );
  const time = new Date() - start;
  console.log(">>>>>>>>>>>>>>>",time/1000,"<<<<", res.data);
}

const x = () => {
    const start = new Date();
    const promises = [];
    for(let i=0;i<process.env.TEST_CALLS;i++){
        promises.push(call());
    }
    Promise.all(promises).then(() => {
        const time = new Date() - start;
        console.log("🚀 ~ file: test.js ~ line 20 ~ x ~ time", time/1000);
    })
//   call();
};

x();
