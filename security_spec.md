# MemeChamp Firestore Security Specification

## 1. Data Invariants
1. **User Balance & Credit Protection:** Virtual credits can never drop below 0. Users cannot arbitrarily increment their own credit balance through client writes.
2. **Server-Authoritative Round State:** Clients cannot modify `crashPoint`, `multiplier`, `state`, or `winningFaction` on `/rounds/{roundId}`. Only backend services or authenticated admins can progress round states.
3. **Bet Immutability & Anti-Late-Join:** A bet document in `/rounds/{roundId}/bets/{betId}` can only be placed when `state == 'WAITING'` or `state == 'COUNTDOWN'`. Once placed, `amount` and `faction` are immutable.
4. **Single Cashout Rule:** A bet cannot be cashed out twice. Cashed out multiplier must not exceed the current round multiplier.
5. **Username Uniqueness & Squatting Guard:** The `usernames/{username}` map document must be created atomically alongside the user profile and can only be claimed by `request.auth.uid`.
6. **Ledger Immutability:** Ledger records are append-only; entries can never be updated or deleted once created.
7. **Identity Integrity:** Any document containing a `uid` field must match `request.auth.uid` on write.
8. **Admin Protection:** The admin collection `/admins/{uid}` cannot be written by standard clients.

## 2. The Dirty Dozen Payloads (Targeting Exploits)
1. **Credit Self-Grant:** Client attempts `update` on `/users/{uid}` with `credits: 999999999`. (Denied by rule requiring server/admin or ledger consistency).
2. **Crash Point Manipulation:** Client attempts `update` on `/rounds/{roundId}` setting `crashPoint: 100.0`. (Denied: round state updates restricted to backend/admin).
3. **Late-Join Exploit:** Client attempts to create `/rounds/{roundId}/bets/{betId}` when round is already `ACTIVE` or `CRASHED`. (Denied: state invariant check).
4. **Post-Crash Cashout:** Client attempts to update bet status to `cashed_out` after round is `CRASHED`. (Denied: terminal state locking).
5. **Double Cashout Race:** Client attempts to cash out an already `cashed_out` bet with a higher multiplier. (Denied: state transition restriction).
6. **Negative Stake:** Client attempts to place a bet with `amount: -500` to manipulate balance. (Denied: `amount > 0 && amount <= 100000`).
7. **Ghost Field Injection:** Client attempts to inject `isAdmin: true` into their user profile. (Denied: `keys().hasOnly()` check).
8. **Username Spoofing:** User A attempts to write to `/usernames/doge_king` with User B's uid. (Denied: `incoming().uid == request.auth.uid`).
9. **Ledger Tampering:** User attempts to `delete` or `update` a ledger entry to erase losses. (Denied: `allow update, delete: if false`).
10. **ID Poisoning Attack:** Client submits a 50KB junk string as `roundId` or `userId`. (Denied: `isValidId()` enforcing length <= 128 and regex `^[a-zA-Z0-9_\-]+$`).
11. **Other User's Bet Modification:** User A attempts to modify User B's bet document. (Denied: `resource.data.uid == request.auth.uid`).
12. **Notification Interception:** User A attempts to read User B's notifications. (Denied: `resource.data.uid == request.auth.uid`).

## 3. Security Assertions & Verification Plan
- Standard operations run safely under client authentication.
- Critical operations (crash calculation, cashout validation, credit balance transitions) run through verified server endpoints using the Firebase Admin / Service context or transactional guards.
