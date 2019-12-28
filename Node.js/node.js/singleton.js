// express에서 환경변수를 가지고 있는 객체를 만든다 가정했을 때, 유저의 요청이 있을 때마다 환경설정을 계속 읽게 되는 오버헤드 발생.
// 또는 redis에서 캐시 모듈이 생성될 때마다 초기화되는 오버헤드 발생.
// 최초 한번만 실행하는 것을 보장하는 singleton 패턴으로 이를 방지.
class CacheManager {
  constructor() {
    if (!CacheManager.instance) {
      this._cache = [];
      CacheManager.instance = this;
    }
    return CacheManager.instance;
  }
}

const instance = new CacheManager();
Object.freeze(instance); // 객체 동결
