// Lets start saying that we bought X coin at 100
//
// We should wait until 120 and then selling high
//
// Or wait until 80 and the buying the dip
//
// Both cases can ocurr, and we don't know which one will happen first
//
// But if for this example, lets say it reachs 120 and we sell at profit, then we need to wait for 100 or lower to buy the dip again.
// We can't use the 120 -> buy strategy anymore, unless it dipped and we bought the dip. We should always await for a dip after selling
// and a rising after buying.
//
// We always going to have ups and downs, but is up to us to react accordingly to the cases that are presented
// to us.
//
// for this reason, Buy low / sell high strategy should evaluate the next step on every operation, storing
// last value and comparing to original
//
// For sake of avoiding overcomplexity on operations, we follow a stric linear process of buy / sell, never
// buying or selling twice in a row.
//
// For this, we're going to create two main functions without any intelligence
//

describe("Buy low and sell high", () => {
	it("Dummy", () => {
		expect(4).toBe(2 + 2)
	})
})
