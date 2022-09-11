<script lang="ts">
import moment from 'moment';
import { ref } from 'vue';
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

export default {
    data() {
        const sampleNotifications = ref(
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
            }
            ]
        )
        return {
            sampleNotifications: JSON.parse(JSON.stringify(sampleNotifications.value)) as Notification[]
        }
    },
    components: {
        OneNotification
    }
}
</script>

<template>
    <div class="bg-grey-300 w-fit">
        <div v-for="(sampleNotification,index) in sampleNotifications" :key="index">
            <!-- <p>{{sampleNotification.name}} - {{index}}</p> -->
            <OneNotification :anotification="sampleNotification"></OneNotification>
            <hr>
        </div>
    </div>
</template>