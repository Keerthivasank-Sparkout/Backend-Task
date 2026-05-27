const { processRefundRequest } = require("../src/03_third_test")
describe("processRefundRequest", () => {
    test("call the payment gateway dependancy with correct payment_id", () => {
        const createGatewayRefundMock = jest.fn().mockReturnValue({
            ok: false,
            // refundId: "rdf_001"
        })
        const result = processRefundRequest(
            "001",
            "002",
            2000,
            3,
            createGatewayRefundMock
        )
        expect(createGatewayRefundMock).toHaveBeenCalledTimes(1);
        expect(createGatewayRefundMock).toHaveBeenCalledWith(
            "002",
            2000,
            "Customer refund for order 001"
        )
        expect(result).toEqual({
            // status: "approved",
            // message: "Refund processed successfully",
            // refundId: "rdf_001",
            // refundedAmount: 2000,
            status: "failed",
            message: "Gateway refund failed",
            refundId: null,
            refundedAmount: 0,
        })
    })
})