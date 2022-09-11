<script setup lang="ts">
import { ref, watch } from 'vue'
import { defineProps } from "vue";
import type { NotificationInterface } from '@/components/interfaces'
import moment from "moment"
import Button from '../ui/Button.vue';
import FigmaVue from '../icons/Figma.vue';
import PdfVue from '../icons/Pdf.vue';
import { EnvelopeIcon } from '@heroicons/vue/24/solid';
import { EnvelopeOpenIcon } from '@heroicons/vue/24/solid';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import { MinusCircleIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
    notification: {
        type: Object as () => NotificationInterface,
        required: true
    },
    allMessagesRead: {
        type: Boolean,
        required: true
    }
});

const notification = props.notification;
const connector = {
    join: 'joined to',
    edited: 'edited',
    mention: 'mention you in',
    upgrade_plan: 'is requesting to upgrade',
    file: 'upload a file',
}
const removedAndAddedWords = (oldMessage: string, newMessage: string) => {
    const oldWords = oldMessage?.split(' ')
    const newWords = newMessage?.split(' ')
    const removedWords = oldWords?.filter(word => !newWords.includes(word))
    const addedWords = newWords?.filter(word => !oldWords.includes(word))
    return { removedWords, addedWords }
}

const wordsInOldMessage = notification.metadata?.oldMessage?.split(' ')
const wordsInNewMessage = notification.metadata?.newMessage?.split(' ')
const difference = removedAndAddedWords(notification.metadata?.oldMessage, notification.metadata?.newMessage)


const generateRandomHSLColor = () => {
    const hue = Math.floor(Math.random() * 360)
    return {
        backgroundColor: `hsl(${hue}, 100%, 90%)`,
        color: `hsl(${hue}, 100%, 30%)`
    }
}
const randomColor = generateRandomHSLColor()
const startingLettersOfName = notification.name?.split(' ').map((word: string) => word[0]).join('')
const newWordsLength = wordsInOldMessage?.length > wordsInNewMessage?.length ? wordsInOldMessage?.length : wordsInNewMessage?.length
const statusTooltip = notification.status.charAt(0).toUpperCase() + notification.status.slice(1);
const messageRead = ref(notification.read)
const showToolTip = ref(false)
const acceptUpgradePlan = ref<boolean | undefined>(undefined)

const upgradePlan = (upgradeValue: boolean) => {
    acceptUpgradePlan.value = upgradeValue
}

watch(() => props.allMessagesRead, (newVal, oldVal) => {
    if (newVal === true) {
        messageRead.value = true
    }
    else {
        messageRead.value = false
    }
});

</script>

<template>
    <div class="min-h-[50px] px-4 pt-2" :class="messageRead === false && 'bg-read'">
        <div class="border-b-grey border-b pb-2 border-opacity-10">
            <div class="flex justify-between gap-x-2">
                <div class="flex w-full gap-x-1">
                    <div class="min-w-[50px]">
                        <div class="relative px-1">
                            <img v-if="notification.photo" v-bind:src="notification.photo" alt=""
                                class="rounded-lg h-10 w-10">
                            <div v-else class="rounded-lg h-10 w-10 flex items-center justify-center"
                                :style="{backgroundColor: randomColor.backgroundColor}">
                                <p v-if="!notification.photo" :style="{ 'color': randomColor.color}">
                                    {{startingLettersOfName}}</p>
                            </div>
                            <div v-if="notification.status === 'online' || notification.status==='busy'"
                                class=" absolute rounded-full h-3.5 w-3.5 right-0 -mt-2.5 border-2 border-transparent"
                                :title="statusTooltip"
                                :class="notification.status === 'online' ? 'bg-online border-white' : notification.status === 'busy' ? 'bg-busy border-white' : ''" />
                        </div>
                    </div>
                    <div class="flex flex-col justify-center">
                        <p class="inline-flex flex-wrap gap-x-1">
                            <span class="whitespace-nowrap font-bold">{{notification.name}}</span>
                            <span class="whitespace-nowrap">{{(connector[(notification.item_type)])}}</span>
                            <span class="font-bold whitespace-nowrap flex gap-x-1">
                                <p>{{notification.emoji}}</p>
                                <p>{{notification.metadata.title}}</p>
                            </span>
                        </p>
                        <p class="flex flex-wrap items-center gap-x-1">
                            <span class="text-grey">{{moment(notification.date).fromNow()}}</span>
                            <template v-if="notification.item_type !== 'file'">
                                <span class="bg-grey rounded-full h-1 w-1" />
                                <span class="text-grey">{{notification.group}}</span>
                            </template>
                        </p>
                        <span v-if="notification.item_type === 'upgrade_plan'" class="my-2 flex items-center gap-x-2">
                            <Button
                                class="bg-black rounded-lg text-white hover:bg-green-600 shadow-md disabled:cursor-not-allowed"
                                @click="upgradePlan(true)"
                                :hidden="acceptUpgradePlan === true || acceptUpgradePlan === false">Accept</Button>
                            <Button class=" bg-white rounded-lg text-black border-[#dedcdc] border shadow-md hover:bg-red-400
                            hover:text-white disabled:cursor-not-allowed" @click="upgradePlan(false)"
                                :hidden="acceptUpgradePlan === true || acceptUpgradePlan === false">Decline</Button>
                            <Transition>
                                <div v-if="acceptUpgradePlan === true" class="flex items-center">
                                    <CheckCircleIcon class="text-online h-7 w-7" />
                                    <p class="font-semibold">Accepted</p>
                                </div>
                            </Transition>
                            <Transition>
                                <div v-if="acceptUpgradePlan === false" class="flex items-center">
                                    <MinusCircleIcon class="text-busy h-7 w-7" />
                                    <p class="font-semibold">Declined</p>
                                </div>
                            </Transition>
                        </span>
                        <span v-if="notification.item_type === 'file'" class="my-2 flex gap-x-2">
                            <p class="inline-flex gap-x-1 whitespace-nowrap items-center">
                                <FigmaVue class="bg-white rounded-lg shadow-md p-2 h-10 w-10 border-grey border mr-2"
                                    v-if="notification.metadata.type === 'fig'" />
                                <PdfVue class="bg-white rounded-lg shadow-md p-2 h-10 w-10 border-grey border mr-2"
                                    v-if="notification.metadata.type === 'pdf'" />
                                <span
                                    class="font-semibold">{{notification.metadata.filename}}.{{notification.metadata.type}}</span>
                                <span class="text-grey">{{notification.metadata.size}}</span>
                            </p>
                        </span>
                        <span v-if="wordsInOldMessage && wordsInNewMessage"
                            class="my-2 flex flex-row gap-x-1 flex-wrap">
                            <p v-for="(n,i) in newWordsLength" :key="i" class="inline-flex font-semibold mt-1">
                                <span v-if="wordsInOldMessage[i] === wordsInNewMessage[i]">
                                    {{wordsInOldMessage[i]}}
                                </span>
                                <span v-else class="flex gap-x-1">
                                    <span v-if="difference.removedWords.includes(wordsInOldMessage[i])"
                                        class="line-through text-grey">{{wordsInOldMessage[i]}}</span>
                                    <span v-else>{{wordsInOldMessage[i]}}</span>
                                    <span v-if="difference.addedWords.includes(wordsInNewMessage[i])" class="font-bold"
                                        :style="{backgroundColor: randomColor.backgroundColor}">{{wordsInNewMessage[i]}}</span>
                                    <span v-else>{{wordsInNewMessage[i]}}</span>
                                </span>
                            </p>
                        </span>
                    </div>
                </div>
                <div>
                    <EnvelopeOpenIcon v-if="messageRead" class="h-5 w-5 hover:cursor-pointer"
                        :title="messageRead ? 'Mark as unread' : 'Mark as read'" @click="messageRead = !messageRead"
                        @mouseenter="showToolTip = true" @mouseleave="showToolTip = false" />
                    <EnvelopeIcon v-else class="h-5 w-5 hover:cursor-pointer"
                        :title="messageRead ? 'Mark as unread' : 'Mark as read'" @click="messageRead = !messageRead"
                        @mouseenter="showToolTip = true" @mouseleave="showToolTip = false" />
                    <Transition>
                        <div v-if="showToolTip"
                            class="bg-black rounded-lg absolute -ml-20 text-white px-2 text-sm whitespace-nowrap">
                            {{messageRead ? 'Mark as unread' :
                            'Mark as read'}}
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>
