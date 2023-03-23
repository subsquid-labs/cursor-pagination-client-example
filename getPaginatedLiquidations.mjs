import { request, gql } from 'graphql-request'
import readlineSync from 'readline-sync'
import Table from 'easy-table'

const ENTRIES_PER_PAGE = 5

function printNodes(nodes) {
	let table = new Table()
	for(let n of nodes) {
		table.cell('id', n.id)
		table.cell('user', n.user)
		table.newRow()
	}
	console.log(table.toString())
}

async function processQuery(query) {
	let pageInfo
	await request('https://squid.subsquid.io/aave-v2-liquidations-http/graphql', query).then((data) => {
		pageInfo = data.liquidationEventsConnection.pageInfo

		console.log()
		printNodes(data.liquidationEventsConnection.edges.map(e => e.node))
		console.log(`Current pageInfo: ${JSON.stringify(pageInfo)}`)
		console.log()
	})
	return pageInfo
}

function getFirstPageQuery() {
	return gql`
		query {
			liquidationEventsConnection(orderBy: id_ASC, first: ${ENTRIES_PER_PAGE}) {
				pageInfo {
					hasNextPage
					endCursor
					hasPreviousPage
					startCursor
				}
				totalCount
				edges {
					cursor
					node {
						id
						user
					}
				}
			}
		}
	`
}

function getNextPageQuery(pageInfo) {
	return gql`
		query {
			liquidationEventsConnection(orderBy: id_ASC, after: "${pageInfo.endCursor}", first: ${ENTRIES_PER_PAGE}) {
				pageInfo {
					hasNextPage
					endCursor
					hasPreviousPage
					startCursor
				}
				totalCount
				edges {
					cursor
					node {
						id
						user
					}
				}
			}
		}
	`
}

async function navigateLiquidationPages() {
	let pageInfo
	while (true) {
		let action = readlineSync.question(`Pick a destination: s - first page, ${pageInfo?.hasNextPage ? 'd - next page, ' : ''}q - quit `)
		switch (action) {
			case 'q':
				process.exit(0)
			case 's':
				pageInfo = await processQuery(getFirstPageQuery())
				break
			case 'd':
				if (pageInfo) {
					pageInfo = await processQuery(getNextPageQuery(pageInfo))
				}
				break
			default:
				continue
		}
	}
}

await navigateLiquidationPages()
