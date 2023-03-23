An interactive example of Connection-based pagination
=====================================================

This simple script demonstrates paginated data retrieval from a squid using [Connection queries](http://localhost:3000/query-squid/paginate-query-results/#cursor-based-pagination).

To start, execute:
```bash
git clone https://github.com/subsquid-labs/cursor-pagination-client-example
cd cursor-pagination-client-example
npm ci
node getPaginatedLiquidations.mjs
```

Then follow the prompt:
```bash
$ node getPaginatedLiquidations.mjs 
Pick a destination: s - first page, q - quit s

id                       user                                      
-----------------------  ------------------------------------------
0011471171-000056-e8ce8  0xA53Fe221Bd861F75907d8Fd496DB1c70779721aA
0011471182-000018-e2234  0x9A90AFFD5Fd50561A98a6Fb4358F941a131Ac592
0011471183-000217-84150  0x9A90AFFD5Fd50561A98a6Fb4358F941a131Ac592
0011471194-000067-d7c91  0xa0B38f17b0Ca2536A0e7606FCf01ef13D9b0793C
0011471465-000312-712b6  0xA53Fe221Bd861F75907d8Fd496DB1c70779721aA

Current pageInfo: {"hasNextPage":true,"endCursor":"5","hasPreviousPage":false,"startCursor":"1"}

Pick a destination: s - first page, d - next page, q - quit d

id                       user                                      
-----------------------  ------------------------------------------
0011473955-000149-01ee5  0xa842Db65486E996ca467833480b7E50f8a123443
0011492730-000095-de2ed  0xe6cB101eba87C46dB7bb1E27aD2bd73482837a1c
0011492824-000098-8bb4f  0x41d8ecd552C35D1f5dc1A6B6b8A9087B1f6E39E6
0011502178-000175-ad4f4  0x5382859146010AC16E142b6708F8e178E77F66BC
0011502586-000214-e018a  0x0aFDE4Bfb50F3b908440C7E04Ba7d45aa9f5cE7f

Current pageInfo: {"hasNextPage":true,"endCursor":"10","hasPreviousPage":true,"startCursor":"6"}

Pick a destination: s - first page, d - next page, q - quit q
$
```
