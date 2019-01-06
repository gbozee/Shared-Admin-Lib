import axios from "axios";

const queries = environment => ({
	create_recipient: `
		query create_recipient($account_name: String!, $account_id: String!, $bank: String!){
			paystack_endpoint(environment: ${JSON.stringify(environment)}){
				create_recipient(account_name: $account_name, account_id: $account_id, bank: $bank){
					recipient_code
					type
					name
					details
				}
			}
		}
	`,
	get_banks: `
		query get_banks{
		  paystack_endpoint(environment: ${JSON.stringify(environment)}){
		    get_banks{
		      name
		      code
		    }
		  }
		}`,
	account_balance: `
		query account_balance($currency: String){
			paystack_endpoint(environment: ${JSON.stringify(environment)}){
				account_balance(currency: $currency){
					balance 
					currency
				}
			}
		}`,
	create_transfer: `
		query create_transfer($recipient_code: String!,$amount: Float!,$reason: String){
			paystack_endpoint(environment: ${JSON.stringify(environment)}){
				create_transfer(recipient_code:$recipient_code,amount:$amount, reason:$reason)
			}
		}`,
	get_transfer: `
		query get_transfer($transfer_code: String!){
			paystack_endpoint(environment: ${JSON.stringify(environment)}){
				get_transfer(transfer_code: $transfer_code){
					amount
					status
					createdAt
					updatedAt
					recipient_code{
						type
						name
						details
					}
				}
			}
		}`
});
const makeApiCall = (BASE_URL, public_key, environment) => (
	key,
	variables = {}
) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${public_key}`
		}
	};
	return axios
		.post(
			BASE_URL,
			{
				query: queries(environment)[key],
				variables
			},
			config
		)
		.then(responseCallback(key));
};

function responseCallback(key) {
	return response => response.data.data.paystack_endpoint[key];
}
function createPayout(apiCaller) {
	return (account_name, account_id, bank) =>
		apiCaller("create_recipient", { account_name, account_id, bank });
}
const PaystackQuery = (base_url, public_key = "", environment = "dev") => {
	const apiCaller = makeApiCall(base_url, public_key, environment);
	return {
		createPayout: createPayout(apiCaller),
		getBanks: () => apiCaller("get_banks"),
		getBalance: (currency = "NGN") =>
			apiCaller("account_balance", { currency }).then(data => {
				return data[0].balance;
			}),
		createTransfer: (payout, reason = "Tuteria Payment") => {
			let promise;
			if (payout.recipient_code) {
				promise = new Promise(resolve => payout.recipient_code);
			} else {
				promise = createPayout(apiCaller)(
					payout.account_name,
					payout.account_no,
					payout.bank
				).then(response => {
					return response.recipient_code;
				});
			}
			return promise
				.then(code => {
					return apiCaller("create_transfer", {
						recipient_code: code,
						amount: payout.amount,
						reason
					});
				})
				.then(response => {
					return response[0];
				});
		},
		verifyTransfer: code =>
			apiCaller("get_transfer", { transfer_code: code }).then(
				data => data.status === "success"
			)
	};
};

export default PaystackQuery;
