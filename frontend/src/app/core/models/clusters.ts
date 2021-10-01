
export class ClusterResult{
    constructor(){
        this.data = []
        this.aggregation = new Aggregation()
    }
    data: Clusters[]
    aggregation: Aggregation
}
export class Clusters {
    id: string
    name: string
    users: ClusterPermissons[]
    metrics: ClusterMetrics
    isConnected: boolean
    lastSyncMessage: string
    registerScript: string
}

export class ClusterPermissons {
    userId: string
    permissons: string[]
}

export class ClusterMetrics {

    totalCpuCores: number
    totalCpuUsage: number
    totalMemory: number
    totalMemoryUsage: number
    cpuPercentage: string
    memoryPercentage: string
    nodesCount: number
    provider: string
}

export class Aggregation {
    totalCount: number
    totalNodes: number
    totalCpu: number
    totalCpuUsage: number
    totalMemory: number
    totalMemoryUsage: number
    cpuPercentage: string
    memoryPercentage: string
}