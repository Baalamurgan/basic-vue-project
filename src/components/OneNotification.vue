<script setup lang="ts">
import { toRefs } from 'vue';
import { defineProps } from "vue";
import type { Notification } from './Notifications.vue';
import moment from "moment"
import Button from "./ui/Button.vue"
import FigmaVue from "./icons/Figma.vue";

const props = defineProps({
    anotification: Object as () => Notification,
});

const notification = JSON.parse(JSON.stringify(toRefs(props).anotification?.value)) as Notification
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
console.log({ notification })
const difference = removedAndAddedWords(notification.metadata?.oldMessage, notification.metadata?.newMessage)


const generateRandomHSLColor = () => {
    const hue = Math.floor(Math.random() * 360)
    return {
        backgroundColor: `hsl(${hue}, 100%, 90%)`,
        color: `hsl(${hue}, 100%, 30%)`
    }
}
const randomColor = generateRandomHSLColor()
const startingLettersOfName = notification.name?.split(' ').map(word => word[0]).join('')
const newWordsLength = wordsInOldMessage?.length > wordsInNewMessage?.length ? wordsInOldMessage?.length : wordsInNewMessage?.length
const statusTooltip = notification.status.charAt(0).toUpperCase() + notification.status.slice(1);
console.log(difference)
</script>

<template>
    <div class="min-h-[50px] px-5 py-2" :class="notification.read === false && 'bg-read'">
        <div class="flex gap-x-3">
            <div class="">
                <div class="relative px-1">
                    <img v-if="notification.photo" v-bind:src="notification.photo" alt="" class="rounded-lg h-10 w-10">
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
                <p class="inline-flex gap-x-1 whitespace-nowrap">
                    <span class="font-bold">{{notification.name}}</span>
                    <span>{{connector[notification.item_type]}}</span>
                    <span>{{notification.emoji}}</span>
                    <span class="font-bold">{{notification.metadata.title}}</span>
                </p>
                <p class="inline-flex items-center gap-x-1 whitespace-nowrap">
                    <span class="text-grey">{{moment(notification.date).fromNow()}}</span>
                    <template v-if="notification.item_type !== 'file'">
                        <span class="bg-grey rounded-full h-1 w-1" />
                        <span class="text-grey">{{notification.group}}</span>
                    </template>
                </p>
                <span v-if="notification.item_type === 'upgrade_plan'" class="my-2 flex gap-x-2">
                    <Button
                        class="bg-black rounded-lg text-white hover:bg-green-600 hover:text-black shadow-md">Accept</Button>
                    <Button
                        class="bg-white rounded-lg text-black border-[#dedcdc] border shadow-md hover:bg-red-400">Decline</Button>
                </span>
                <span v-if="notification.item_type === 'file'" class="my-2 flex gap-x-2">
                    <p class="inline-flex gap-x-1 whitespace-nowrap items-center">
                        <FigmaVue class="bg-white rounded-lg shadow-md p-2 h-10 w-10 border-grey border mr-2"
                            v-if="notification.metadata.type === 'figma'" />
                        <span
                            class="font-semibold">{{notification.metadata.filename}}.{{notification.metadata.type}}</span>
                        <span class="text-grey">{{notification.metadata.size}}</span>
                    </p>
                </span>
                <span v-if="wordsInOldMessage && wordsInNewMessage" class="my-2 flex flex-row gap-x-1">
                    <p v-for="(n,i) in newWordsLength" :key="i" class="inline-flex font-semibold">
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

                    <!-- 
                    <p class="inline-flex flex-wrap whitespace-nowrap items-center text-sm">
                        <span class="font-semibold" v-for="oldWord in wordsInOldMessage">{{oldWord}}.</span>
                    </p>
                    <p class="inline-flex flex-wrap whitespace-nowrap items-center text-sm">
                        <span class="font-semibold" v-for="newWord in wordsInNewMessage">{{newWord}}.</span>
                    </p> -->
                    <!-- <span class="font-semibold">{{difference.removedWords?.join(' ')}}</span> -->
                    <!-- <span class="font-semibold">{{difference.addedWords?.join(' ')}}</span> -->
                    <!-- <span class="">{{notification.metadata.oldMessage}}.{{notification.metadata.type}}</span> -->
                    <!-- <span class="text-grey">{{notification.metadata.newMessage}}</span> -->
                </span>
            </div>
        </div>
    </div>
</template>