import { Injectable } from "@angular/core"

export enum ResourceTypes {
    RESOUCETYPE_NODES = "Nodes",
    RESOUCETYPE_NAMESPACES = "Name Spaces",
    RESOUCETYPE_PODS = "Pods",
    RESOUCETYPE_DEPLOYMENTS = "Deployments",
    RESOUCETYPE_SERVICES = "Services",
    RESOUCETYPE_INGRESS = "Ingress",
    RESOUCETYPE_SECRETS = "Secrets",
}

export enum EventsTypes {
    Added = "ADDED",
    Modified = "MODIFIED",
    Deleted = "DELETED",
    Bookmark = "BOOKMARK",
    Error = "ERROR"
}

export class ResourceResult<T extends BaseResource> {
    resourceType: ResourceTypes
    data: K8sItems<T>
}

export class ResourceResultOne<T extends BaseResource> {
    resourceType: ResourceTypes
    data: T
}

export class K8sItems<T extends BaseResource>{
    items: T[]
    metadata: {}
    message: string

}

// marker class for generic

export class BaseResource {

}

export class NameSpace extends BaseResource {
    metadata: {
        annotations: {},
        creationTimestamp: string,
        finalizers: string[],
        labels: {},
        managedFields: {
            apiVersion: string,
            fieldsType: string,
            fieldsV1: {},
            manager: string,
            operation: string,
            time: Date
        }[],
        name: string,
        resourceVersion: string,
        uid: string

    }
    spec: {
        finalizers: string[]
    }
    status: {
        phase: string
    }

}

export class Nodes extends BaseResource {
    metadata: {
        annotations: {},
        creationTimestamp: string,
        finalizers: string[],
        labels: {},
        managedFields: {
            apiVersion: string,
            fieldsType: string,
            fieldsV1: {},
            manager: string,
            operation: string,
            time: Date
        }[],
        name: string,
        resourceVersion: string,
        uid: string

    }
    spec: {
        podCIDR: string,
        podCIDRs: string[],
        providerID: string
    }
    status: {
        addresses: { address: string, type: string }[],
        allocatable: {
            cpu: string,
            "ephemeral-storage": string,
            "hugepages-2Mi": string,
            memory: string,
            pods: string
        },
        capacity: {
            cpu: string,
            "ephemeral-storage": string,
            "hugepages-2Mi": string,
            memory: string,
            pods: string
        },
        conditions: {
            lastHeartbeatTime: Date,
            lastTransitionTime: Date,
            message: string,
            reason: string,
            status: string,
            type: string
        }[],

        daemonEndpoints: {

        },
        images: {
            names: string[],
            sizeBytes: number
        }[],
        nodeInfo: {
            architecture: string,
            bootID: string,
            containerRuntimeVersion: string,
            kernelVersion: string,
            kubeProxyVersion: string,
            kubeletVersion: string,
            machineID: string,
            operatingSystem: string,
            osImage: string,
            systemUUID: string
        }
    }
}

export class Pods extends BaseResource {
    metadata: {
        annotations: {},
        creationTimestamp: string,
        generateName: string
        finalizers: string[],
        labels: {},
        managedFields: {
            apiVersion: string,
            fieldsType: string,
            fieldsV1: {},
            manager: string,
            operation: string,
            time: Date
        }[],
        name: string,
        namespace: string,
        ownerReferences: [{
            apiVersion: string,
            blockOwnerDeletion: boolean,
            controller: boolean,
            kind: string,
            name: string,
            uid: string
        }],
        resourceVersion: string,
        uid: string,
    }
    spec: {
        containers: {
            args: string[],
            env: {
                name: string,
                value: string
            }[],

            image: string,
            imagePullPolicy: string,
            name: string,
            resources: {},
            terminationMessagePath: string,
            terminationMessagePolicy: string,
            volumeMounts: {
                mountPath: string,
                name: string
            }[]
        },
        dnsPolicy: string,
        enableServiceLinks: boolean,
        nodeName: string,
        preemptionPolicy: string,
        priority: number,
        restartPolicy: string,
        schedulerName: string,
        securityContext: {},
        serviceAccount: string,
        serviceAccountName: string,
        terminationGracePeriodSeconds: number,
        tolerations: {
            key?: string,
            operator?: string,
            effect?: string,
            tolerationSeconds?: number
        }[],
        volumes: {}[]

    }
    status: {
        conditions: {
            lastProbeTime?: string,
            lastTransitionTime?: string,
            reason?: string,
            status?: string,
            type?: string
        }[],
        containerStatuses?: {
            containerID?: string,
            image?: string,
            imageID?: string,
            lastState?: {},
            name?: string,
            ready?: boolean,
            restartCount?: number,
            started?: boolean,
            state?: {
                terminated?: {
                    containerID?: string,
                    exitCode?: number,
                    finishedAt?: string,
                    reason?: string,
                    startedAt?: string
                }
            }
        }[]

        hostIP?: string,
        phase?: string,
        podIP?: string,
        podIPs?: [
            {

            }
        ],
        qosClass?: string,
        startTime?: string
    }
}

export class Deployments extends BaseResource {
    metadata?: {
        annotations?: {},
        creationTimestamp?: string,
        generation?: number
        labels?: {},
        managedFields?: {
            apiVersion?: string,
            fieldsType?: string,
            fieldsV1?: {},
            manager?: string,
            operation?: string,
            time?: Date
        }[],
        name?: string,
        namespace?: string,
        resourceVersion?: string,
        uid?: string,
    }

    spec?: {
        progressDeadlineSeconds: number,
        replicas: number,
        revisionHistoryLimit: number,
        selector?: {
            matchLabels: {

            }
        },
        strategy: {
            rollingUpdate: {

            },
            type: string
        },

        template?: {
            metadata?: {
                creationTimestamp?: string,
                labels?: {}
            }
        },
        spec?: {
            containers?: {
                args?: string[],
                image?: string,
                imagePullPolicy?: string,
                livenessProbe?: {},
                readinessProbe?: {},
                name?: string,
                ports?: {
                    containerPort?: number,
                    name?: string,
                    protocol?: string
                }[],
                resources?: {
                    limits?: {
                        cpu?: string,
                        memory?: string
                    },
                    requests?: {
                        cpu?: string,
                        memory?: string
                    }
                },
                securityContext?: {
                    allowPrivilegeEscalation?: boolean,
                    capabilities?: {
                        add?: string[],
                        drop?: string[]
                    },
                    readOnlyRootFilesystem?: string
                },
                terminationMessagePath?: string
                terminationMessagePolicy?: string,
                volumeMounts?: {
                    mountPath?: string,
                    name?: string,
                    readOnly?: boolean
                }[]



            }[],
            dnsPolicy?: string,
            nodeSelector?: {},
            priorityClassName?: string,
            restartPolicy?: string,
            schedulerName?: string,
            securityContext?: {},
            serviceAccount?: string,
            serviceAccountName?: string,
            terminationGracePeriodSeconds?: number,
            tolerations?: {
                effect?: string,
                key?: string,
                operator?: string
            }[],
            volumes: {}[]
        }
    }

    status?: {
        availableReplicas?: number,
        conditions?: [
            {
                lastTransitionTime?: Date,
                lastUpdateTime?: Date,
                message?: string,
                reason?: string,
                status?: string,
                type?: string
            }
        ],
        observedGeneration?: number,
        readyReplicas?: number,
        replicas?: number,
        updatedReplicas?: number
    }

    lastState: {
        state: string
        message: string
        reason: string
    }

}

export class Services extends BaseResource {
    metadata?: {
        annotations?: {},
        creationTimestamp?: string,
        labels?: {},
        managedFields?: {
            apiVersion?: string,
            fieldsType?: string,
            fieldsV1?: {},
            manager?: string,
            operation?: string,
            time?: Date
        }[],
        name?: string,
        namespace?: string,
        resourceVersion?: string,
        uid?: string,
    }
    spec?: {
        clusterIP?: string,
        clusterIPs?: string[],
        ipFamilies?: string[],
        ipFamilyPolicy?: string,
        ports?: {
            name?: string,
            port?: number,
            protocol?: string,
            targetPort?: number
        }[],

        sessionAffinity?: string,
        type?: string


    }
    status?: {
        loadBalancer?: {}
    }


}

export class Ingresses extends BaseResource {
    metadata?: {
        annotations?: {},
        creationTimestamp?: string,
        generation: number,
        labels?: {},
        managedFields?: {
            apiVersion?: string,
            fieldsType?: string,
            fieldsV1?: {},
            manager?: string,
            operation?: string,
            time?: Date
        }[],
        name?: string,
        namespace?: string,
        resourceVersion?: string,
        uid?: string,
    }

    spec?: {
        rules?: {
            host?: string,
            http?: string,
            paths?: {
                backend?: {
                    service?: string,
                    name?: string,
                    port?: {
                        number?: number
                    }

                },
                path?: string,
                pathType?: string
            }[],

        }[]
    }

    status?: {
        loadBalancer?: {}
    }

}

export class Secrets extends BaseResource {
    data?: {
        "ca.crt"?: string,
        namespace: string,
        token?: string
    }

    metadata?: {
        annotations?: {},
        creationTimestamp?: string,
        labels?: {},
        managedFields?: {
            apiVersion?: string,
            fieldsType?: string,
            fieldsV1?: {},
            manager?: string,
            operation?: string,
            time?: Date
        }[],
        name?: string,
        namespace?: string,
        resourceVersion?: string,
        uid?: string,
    }
    type?: string
}

export class Events extends BaseResource {
    count?: number
    eventTime?: string
    firstTimestamp?: string
    involvedObject?: {
        apiVersion?: string,
        fieldPath?: string,
        kind?: string,
        name?: string,
        namespace?: string,
        resourceVersion?: string,
        uid?: string
    }
    lastTimestamp?: string
    message?: string
    metadata?: {
        annotations?: {},
        creationTimestamp?: string,
        labels?: {},
        managedFields?: {
            apiVersion?: string,
            fieldsType?: string,
            fieldsV1?: {},
            manager?: string,
            operation?: string,
            time?: Date
        }[],
        name?: string,
        namespace?: string,
        resourceVersion?: string,
        uid?: string,
    }

    reason?: string
    reportingComponent?: string
    reportingInstance?: string
    source?: {
        component?: string,
        host?: string
    }

    type?: string


}

export enum ConditionsTypes {
    Available = 'Available',
    Progressing = 'Progressing'
}

export enum ConditionsState {
    Active = 'Active',
    Updating = 'Updating',
    Error = 'Error'
}

@Injectable({ providedIn: 'root' })
export class ResourcesUtils {
    public addDeploymentLastState(deployment: Deployments) {
        deployment.lastState = {
            state: '',
            message: '',
            reason: ''
        }
        if (deployment.status?.conditions.length > 0) {
            const Available = deployment.status?.conditions.find(c => c.type == ConditionsTypes.Available)
            const Progressing = deployment.status?.conditions.find(c => c.type == ConditionsTypes.Progressing)
            if (Available && Available.status == 'True') {
                deployment.lastState.state = ConditionsState.Active
                deployment.lastState.message = Available.message
                deployment.lastState.reason = Available.reason
            } else if (Progressing && Progressing.status == 'True') {
                deployment.lastState.state = ConditionsState.Updating
                deployment.lastState.message = Available.message
                deployment.lastState.reason = Available.reason
            } else {
                deployment.lastState.state = ConditionsState.Error
                deployment.lastState.message = Available.message
                deployment.lastState.reason = Available.reason
            }
        }
    }
}