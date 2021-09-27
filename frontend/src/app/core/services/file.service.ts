import { Injectable } from "@angular/core";
import { parse, stringify } from 'yaml'

@Injectable({ providedIn: 'root' })
export class FileParserService {

    public ParseFileContentToString(e: any): Promise<string> {
        const file  = e.target.files[0]
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                resolve(fileReader.result.toString())
            }
            fileReader.readAsText(file)
        })
    }

    public ConvertYamlToJson<T>(yml: string): T {
        const obj = parse(yml, null)
        return JSON.parse(JSON.stringify(obj, null, 2)) as T
    }

}