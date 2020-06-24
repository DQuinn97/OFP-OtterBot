"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TwitchClient_1 = require("../../../TwitchClient");
var BaseAPI_1 = require("../../BaseAPI");
var HelixPaginatedRequest_1 = require("../HelixPaginatedRequest");
var HelixPagination_1 = require("../HelixPagination");
var HelixExtensionTransaction_1 = require("./HelixExtensionTransaction");
/**
 * The Helix API methods that deal with extensions.
 *
 * Can be accessed using `client.helix.extensions` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const transactions = await client.helix.extionsions.getExtensionTransactions('abcd');
 * ```
 */
var HelixExtensionsAPI = /** @class */ (function (_super) {
    tslib_1.__extends(HelixExtensionsAPI, _super);
    function HelixExtensionsAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves a list of transactions for the given extension.
     *
     * @param extensionId The ID of the extension to retrieve transactions for.
     * @param filter Additional filters.
     */
    HelixExtensionsAPI.prototype.getExtensionTransactions = function (extensionId, filter) {
        if (filter === void 0) { filter = {}; }
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            type: TwitchClient_1.TwitchAPICallType.Helix,
                            url: 'extensions/transactions',
                            query: tslib_1.__assign({ extension_id: extensionId, id: filter.transactionIds }, HelixPagination_1.makePaginationQuery(filter))
                        })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, {
                                data: result.data.map(function (transactionData) { return new HelixExtensionTransaction_1.default(transactionData, _this._client); }),
                                cursor: (_a = result.pagination) === null || _a === void 0 ? void 0 : _a.cursor
                            }];
                }
            });
        });
    };
    /**
     * Creates a paginator for transactions for the given extension.
     *
     * @param extensionId The ID of the extension to retrieve transactions for.
     * @param filter Additional filters.
     */
    HelixExtensionsAPI.prototype.getExtensionTransactionsPaginated = function (extensionId, filter) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        return new HelixPaginatedRequest_1.default({
            url: 'extensions/transactions',
            query: {
                extension_id: extensionId,
                id: filter.transactionIds
            }
        }, this._client, function (data) { return new HelixExtensionTransaction_1.default(data, _this._client); });
    };
    return HelixExtensionsAPI;
}(BaseAPI_1.default));
exports.default = HelixExtensionsAPI;
//# sourceMappingURL=HelixExtensionsAPI.js.map