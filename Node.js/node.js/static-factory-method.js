// 생성자에서 비동기를 못 쓰기 때문에, 생성자로서의 기능을 static 메서드로 교체
class DbManager {
  constructor(config) {}

  static async BUILD(settings) {
    // 수행하고자 하는 모든 비동기 작업
    const config = await this.prototype.init(settings);
    return new DbManager(config);
  }

  async init(settings) {} // 최초 1회 실행
}

const manager = DbManager.BUILD();
