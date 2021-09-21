export class DialogData{
    title: string
    onSave?: Promise<any>
    columns:{
        name: string
        description: string
        type: 'text' | 'checkbox' | 'textarea',
        required?: boolean
    }[]

    data: any
}