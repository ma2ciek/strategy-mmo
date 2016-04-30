export interface IManager<T> {

}

export class HashManager<T> implements IManager<T> {
    protected list: T[] = [];

    public findBy(fn: Function, id: any): T {
        for (var member of this.list) {
            if (fn.call(member) === id) {
                return member;
            }
        }
    }

    public getAll() {
        return this.list;
    }
}

export default HashManager;
