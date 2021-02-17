export const properties = {
  user: {
    user_agent: ['user.user_agent', 'string'],
    ip_address: ['user.ip_address', 'string'],
    id: ['user.id', 'string'],
    geo_info: {
      province: ['user.geo_info.province', 'string'],
      postal_code: ['user.geo_info.postal_code', 'string'],
      country_code: ['user.geo_info.country_code', 'string'],
      country: ['user.geo_info.country', 'string'],
      coordinates: ['user.geo_info.coordinates', 'list'],
      continent: ['user.geo_info.continent', 'string'],
      city: ['user.geo_info.city', 'string'],
    },
    device_info: {
      os: {
        patch_minor: ['user.device_info.os.patch_minor', 'null'],
        patch: ['user.device_info.os.patch', 'string'],
        minor: ['user.device_info.os.minor', 'string'],
        major: ['user.device_info.os.major', 'string'],
        family: ['user.device_info.os.family', 'string'],
      },
      device: { family: ['user.device_info.device.family', 'string'] },
      browser: {
        patch: ['user.device_info.browser.patch', 'string'],
        minor: ['user.device_info.browser.minor', 'string'],
        major: ['user.device_info.browser.major', 'string'],
        family: ['user.device_info.browser.family', 'string'],
      },
    },
  },
  page: {
    url: ['page.url', 'string'],
    protocol: ['page.protocol', 'string'],
    path: ['page.path', 'string'],
    domain: ['page.domain', 'string'],
  },
  keen: {
    timestamp: ['keen.timestamp', 'datetime'],
    id: ['keen.id', 'string'],
    created_at: ['keen.created_at', 'datetime'],
  },
  ad: {
    campaign_id: ['ad.campaign_id', 'num'],
    advertiser: ['ad.advertiser', 'string'],
  },
};
