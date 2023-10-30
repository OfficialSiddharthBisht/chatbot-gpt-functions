const {createChat} = require("completions");
const dotenv = require('dotenv');

dotenv.config();
const chat = createChat({
    apiKey: process.env.OPEN_API_KEY,
    model: "gpt-3.5-turbo-0613",
    functions: [
      {
        name: "sum_of_two_numbers",
        description: "Calculate the sum of two integers",
        parameters: {
          type: "object",
          properties: {
            firstNumber: {
              type: "integer",
              description: "The first integer",
            },
            secondNumber: {
              type: "integer",
              description: "The second integer",
            },
          },
          required: ["firstNumber", "secondNumber"],
        },
        function: async ({ firstNumber, secondNumber }) => {
          const sum = firstNumber + secondNumber;
          return {
            result: sum,
          };
        },
      },
      {
        name:"check_if_number_is_prime",
        description:"Given a number, it checks if the number is prime or not",
        parameters:{
            type:"object",
            properties:{
                num:{
                type:"integer",
                description:"a positive integer"
                }
            },
            required:["num"],
        },
        function: async({num})=>{
            if(num < 2){
                return {
                    result: false
                }
            }else{
                let isPrime = true;
                for(let i = 2; i < num; i++){
                    if(num % i === 0){
                        isPrime = false;
                    }
                }
                if(isPrime){
                    return{
                        result: "is a prime number"
                    }
                }else{
                    return{
                        result:"is not a prime number"
                    }
                }
            }
            
        }
      }
    ],
    functionCall: "auto",
  });
  
  


async function main(){
    const response = await chat.sendMessage("what is the sum of 10 and 14");
    console.log(response.content);
    const response2 = await chat.sendMessage("Is 3 a prime number");
    console.log(response2.content);
}

main();
