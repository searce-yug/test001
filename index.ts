import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const example = new gcp.pubsub.Topic("example", {
    name: "topic-1",
    labels: {
        foo: "bar",
    },
    messageRetentionDuration: "86600s",
});

const defaultAccount = new gcp.serviceaccount.Account("serviceAccount", {
    accountId: "example-state",
    displayName: "Service Account",
});

const pulumi = new gcp.compute.Instance("pulumi", {
    bootDisk: {
        deviceName: "pulumi",
        initializeParams: {
            image: "https://www.googleapis.com/compute/beta/projects/debian-cloud/global/images/debian-11-bullseye-v20230615",
            size: 10,
            type: "pd-balanced",
        },
        source: "https://www.googleapis.com/compute/v1/projects/nikhils-playground-010897/zones/asia-south1-c/disks/pulumi",
    },
    confidentialInstanceConfig: {
        enableConfidentialCompute: false,
    },
    machineType: "e2-micro",
    name: "pulumi",
    networkInterfaces: [{
        accessConfigs: [{
            natIp: "35.244.53.147",
            networkTier: "PREMIUM",
        }],
        network: "https://www.googleapis.com/compute/v1/projects/nikhils-playground-010897/global/networks/default",
        networkIp: "10.160.0.2",
        stackType: "IPV4_ONLY",
        subnetwork: "https://www.googleapis.com/compute/v1/projects/nikhils-playground-010897/regions/asia-south1/subnetworks/default",
        subnetworkProject: "nikhils-playground-010897",
    }],
    project: "nikhils-playground-010897",
    reservationAffinity: {
        type: "ANY_RESERVATION",
    },
    scheduling: {
        onHostMaintenance: "MIGRATE",
        provisioningModel: "STANDARD",
    },
    serviceAccount: {
        email: "776508433270-compute@developer.gserviceaccount.com",
        scopes: [
            "https://www.googleapis.com/auth/devstorage.read_only",
            "https://www.googleapis.com/auth/logging.write",
            "https://www.googleapis.com/auth/service.management.readonly",
            "https://www.googleapis.com/auth/servicecontrol",
            "https://www.googleapis.com/auth/trace.append",
            "https://www.googleapis.com/auth/monitoring.write",
        ],
    },
    zone: "asia-south1-c",
}, {
    protect: true,
});
const gti_terraform = new gcp.serviceaccount.Account("gti-terraform", {
    accountId: "gti-terraform",
    displayName: "gti-terraform",
    project: "nikhils-playground-010897",
}, {
    protect: true,
});
