import 'whatwg-fetch';

const createUrl = (projectId: string, eventCollection: string) =>
  `https://api.keen.io/3.0/projects/${projectId}/events/${eventCollection}`;

class TrackingLite {
  static sendEvent(
    projectId: string,
    authorization: string,
    eventCollection: string,
    payload: Record<string, any>
  ) {
    fetch(createUrl(projectId, eventCollection), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      body: JSON.stringify(payload),
    });
  }
}

export default TrackingLite;
