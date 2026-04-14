import request from '@/utils/request';

export function totalVisit(query?: any) {
  return request.get('/platform/behaviour_stats/total_visit', {
    params: query,
  });
}

export function birthdayList(query?: any) {
  return request.get('/platform/customer/birthday_list', { params: query });
}

export function totalList(query?: any) {
  return request.get('/platform/behaviour_stats/total', { params: query });
}

export function analysePage(query?: any) {
  return request.get('/platform/behaviour_stats/analyse_page', {
    params: query,
  });
}

export function userList(query?: any) {
  return request.get('/platform/behaviour_stats/user', { params: query });
}

export function detailVisit(query?: any) {
  return request.get('/platform/behaviour_stats/detail_visit', {
    params: query,
  });
}

export function statsModule(query?: any) {
  return request.get('/platform/behaviour_stats/module', { params: query });
}

export function moduleOne(query?: any) {
  return request.get('/platform/behaviour_stats/module_one', { params: query });
}

export function moduleOneDay(query?: any) {
  return request.get('/platform/behaviour_stats/module_one_day', {
    params: query,
  });
}

export function statsDue(query?: any) {
  return request.get('/platform/behaviour_stats/due', { params: query });
}

export function dueList(query?: any) {
  return request.get('/platform/behaviour_stats/due_list', { params: query });
}

export function newStats(query?: any) {
  return request.get('/platform/review/new_stats', { params: query });
}

export function getInvitationStatistics(data?: any, query?: any) {
  return request.post(
    '/platform/event_tracking_invitation/getInvitationStatistics',
    data,
    { params: query }
  );
}

export function getMerchantInvitationRanking(query?: any) {
  return request.get(
    '/platform/event_tracking_invitation/getMerchantInvitationRanking',
    { params: query }
  );
}

export function getInvitationRanking(query?: any) {
  return request.get(
    '/platform/event_tracking_invitation/getInvitationRanking',
    { params: query }
  );
}

export function queryOptions(query?: any) {
  return request.get('/system/tenant/options', { params: query });
}
