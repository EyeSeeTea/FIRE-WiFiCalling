import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromUsers from './users-page';
import * as fromNotifications from './notificiations-page';
import * as fromBilling from './billing-page';

export interface AdminState {
  users: fromUsers.State;
  notifications: fromNotifications.State;
  billing: fromBilling.State;
}

export interface State extends fromRoot.State {
  admin: AdminState;
}

export const reducers = {
  users: fromUsers.reducer,
  notifications: fromNotifications.reducer,
  billing: fromBilling.reducer
};

export const selectAdminState = createFeatureSelector<AdminState>('admin');

export const selectUsersState = createSelector(selectAdminState, (state: AdminState) => state.users);
export const selectBillingState = createSelector(selectAdminState, (state: AdminState) => state.billing);
export const selectNotificationsState = createSelector(selectAdminState, (state: AdminState) => state.notifications);

export const getUsers = createSelector(selectUsersState, fromUsers.getUsers);
export const getUsersError = createSelector(selectUsersState, fromUsers.getError);
export const getUsersPending = createSelector(selectUsersState, fromUsers.getPending);

export const getNotifications = createSelector(selectNotificationsState, fromNotifications.getNotifications);
export const getNotifFilter = createSelector(selectNotificationsState, fromNotifications.getFilter);
export const getNotifShowFilterMenu = createSelector(selectNotificationsState, fromNotifications.getShowFilterMenu);
export const getNotifOrder = createSelector(selectNotificationsState, fromNotifications.getOrder);
export const getNotifError = createSelector(selectNotificationsState, fromNotifications.getError);
export const getNotifPending = createSelector(selectNotificationsState, fromNotifications.getPending);

export const getBilling = createSelector(selectBillingState, fromBilling.getBilling);
export const getBillingError = createSelector(selectBillingState, fromBilling.getError);
export const getBillingPending = createSelector(selectBillingState, fromBilling.getPending);

