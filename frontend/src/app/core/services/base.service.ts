import { Router } from "@angular/router";

export abstract class BaseService {
    constructor(protected router: Router) {

    }
    public clusterId = (): string => {
        if (this.router.url) {
            const params = this.router.url.split("/").filter(p=> !!p)
            return params.length > 1 ? params[1] : ""
        }
        return ""
    }

    public NameSpacesId = (): string => {
        if (this.router.url) {
            const params = this.router.url.split("/").filter(p=> !!p)
            return params.length > 3 ? params[3] : "all"
        }

        return "all"

    }
}
