<script setup lang="ts">
import moment from 'moment';
import { computed, ref } from 'vue';
import OneNotification from './OneNotification.vue';

export type ItemTypes = 'join' | 'mention' | 'upgrade_plan' | 'file' | 'edited'
export interface Notification<Meta = any> {
    name: string;
    photo: string;
    item_type: ItemTypes;
    metadata?: Meta;
    group: string;
    emoji: string;
    date: Date | string;
    read: boolean;
    status: 'online' | 'busy' | 'offline'
}

export interface JoinMetaData {
    title: string;
}

export interface MentionMetaData {
    title: string;
}

export interface UpgradePlanMetaData {
    title: string
}

export interface FileMetaData {
    size: string,
    filename: string,
    type: string
}

export interface EditedMetaData {
    title: string,
    oldMessage: string,
    newMessage: string,
}

const dateNow = new Date()

const sampleNotifications = ref<any>(
    [{
        name: 'Anna Srzand',
        photo: "https://fakeimg.pl/100",
        item_type: 'join',
        metadata: {
            title: 'Final Presentation'
        },
        group: 'Social Media Plan',
        emoji: '🔥',
        date: moment(dateNow).subtract(2, 'hours'),
        read: false,
        status: 'online'
    },
    {
        name: 'Jess Raddon',
        item_type: 'mention',
        metadata: {
            title: 'Final Presentation',

        },
        group: 'Hobby List',
        emoji: '😍',
        date: moment(dateNow).subtract(4, 'hours'),
        read: false,
        status: 'none'
    },
    {
        name: 'Sandra Marx',
        photo: "https://fakeimg.pl/100",
        item_type: 'upgrade_plan',
        group: 'Hobby List',
        metadata: {
            title: 'Plan'
        },
        date: moment(dateNow).subtract(12, 'hours'),
        read: true,
        status: 'busy'
    },
    {
        name: 'Adam Smith',
        photo: "https://fakeimg.pl/100",
        item_type: 'file',
        group: 'Hobby List',
        metadata: {
            size: '2mb',
            filename: 'landing_page_ver2',
            type: 'fig'
        },
        title: 'Final Presentation',
        date: moment(dateNow).subtract(1, 'days'),
        read: true,
        status: 'none'
    },
    {
        name: 'Ralpg Turner',
        item_type: 'edited',
        group: 'Hobby List',
        emoji: '🥂',
        metadata:
        {

            title: 'Celebrated Info',
            oldMessage: "Let's add it to the main documentary",
            newMessage: "Let's add it to the secret documents",
        },
        date: moment(dateNow).subtract(4, 'hours'),
        read: true,
        status: 'none'
    },
    {
        name: 'Dan Merix',
        photo: "https://fakeimg.pl/100",
        item_type: 'upgrade_plan',
        metadata: {
            title: 'Plan',
        },
        group: 'Hobby List',
        date: moment(dateNow).subtract(12, 'hours'),
        read: true,
        status: 'busy'
    },
    {},
    {}
    ]
)

const props = defineProps({
    allMessagesRead: {
        type: Boolean,
    },
})

computed(() => {
    if (props.allMessagesRead) {
        sampleNotifications.value.forEach((notification: Notification) => {
            notification.read = true
        })
    }
})
</script>

<template>
    <div>
        <div v-for="(sampleNotification,index) in sampleNotifications" :key="index">
            <OneNotification v-if="Object.keys(sampleNotification).length !== 0" :notification="sampleNotification"
                :all-messages-read="props.allMessagesRead">
            </OneNotification>
            <div v-else class=" min-h-[64px] px-4 py-3">
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
</template>