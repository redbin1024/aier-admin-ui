import request from '@/utils/request';

export function getFunctionsByPackage(packageId: string | number, query?: any) {
  return request.get(`/system/tenant-package-function/package/${packageId}`, {
    params: query,
  });
}

export function getPackagesByFunction(
  functionId: string | number,
  query?: any
) {
  return request.get(`/system/tenant-package-function/function/${functionId}`, {
    params: query,
  });
}

export function savePackageFunctions(data?: any, query?: any) {
  return request.post('/system/tenant-package-function/save', data, {
    params: query,
  });
}

export function deletePackageFunctions(
  packageId: string | number,
  query?: any
) {
  return request.delete(
    `/system/tenant-package-function/package/${packageId}`,
    { params: query }
  );
}
