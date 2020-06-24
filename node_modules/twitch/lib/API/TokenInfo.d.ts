/** @private */
export interface TokenInfoData {
    client_id: string;
    login: string;
    scopes: string[];
    user_id: string;
    expires_in?: number;
}
/**
 * Information about an access token.
 */
export default class TokenInfo {
    private readonly _data?;
    private readonly _obtainmentDate;
    /** @private */
    constructor(_data?: TokenInfoData | undefined);
    /**
     * The client ID.
     */
    get clientId(): string | null;
    /**
     * The ID of the authenticated user.
     */
    get userId(): string | null;
    /**
     * The user name of the authenticated user.
     */
    get userName(): string | null;
    /**
     * The scopes for which this token is valid.
     */
    get scopes(): string[];
    /**
     * Whether the token is valid or not.
     *
     * @deprecated This will be replaced with an exception soon; you can already add a try-catch for this future case.
     */
    get valid(): boolean;
    /**
     * The time when the token will expire.
     *
     * If this returns null, it means that the token is either invalid or never expires (happens with old client IDs).
     */
    get expiryDate(): Date | null;
}
