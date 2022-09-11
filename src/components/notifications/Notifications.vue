<script setup lang="ts">
import { computed } from '@vue/reactivity';
import OneNotification from './OneNotification.vue';
import type { NotificationInterface } from '../interfaces'

const props = defineProps({
    allMessagesRead: {
        type: Boolean,
    },
    sampleNotifications: {
        type: Array as () => NotificationInterface[],
    },
})

computed(() => {
    if (props.sampleNotifications && props.allMessagesRead) {
        props.sampleNotifications.forEach((notification: NotificationInterface) => {
            notification.read = true
        })
    }
})

</script>

<template>
    <div class="min-h-[400px] overflow-y-auto z-40">
        <div v-if="sampleNotifications">
            <div v-for="(sampleNotification,index) in sampleNotifications" :key="index">
                <OneNotification v-if="Object.keys(sampleNotification).length !== 0" :notification="sampleNotification"
                    :all-messages-read="props.allMessagesRead">
                </OneNotification>
                <div v-else class="min-h-[64px] px-4 py-3">
                    <div class="flex gap-x-3">
                        <div class="relative px-1">
                            <div class="rounded-lg h-10 w-10 flex items-center justify-center bg-[#f2f3f3]" />
                        </div>
                        <div class="flex flex-1 gap-y-0.5 flex-col justify-center">
                            <p class="inline-flex gap-x-1 whitespace-nowrap">
                            <div class="bg-[#f2f3f3] w-[70%] h-2.5 rounded-md"></div>
                            </p>
                            <p class="inline-flex items-center gap-x-1 whitespace-nowrap">
                            <div class="bg-[#f2f3f3] w-[30%] h-2.5 rounded-md"></div>
                            </p>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
        </div>
        <div v-else class="mt-5 text-center">
            <h1 class="font-bold text-xl">No Data Found</h1>
        </div>
    </div>
</template>