"use client"

import { useToast } from "@/hooks/use-toast"
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import { useEffect, useState } from "react"

interface Notification {
  title: string
  content: string
}

const Notification = () => {
  const [connection, setConnection] = useState<HubConnection>()
  const [message, setMessage] = useState<Notification>()
  const { toast } = useToast()

  useEffect(() => {
    if (!connection) {
      const newConnect = new HubConnectionBuilder()
        .withUrl("https://api.nosteable.works/signalHub")
        .withAutomaticReconnect()
        .build()
      setConnection(newConnect)
    }
  }, [connection])

  useEffect(() => {
    if (!connection || connection.state !== "Disconnected") return

    connection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub")
      })
      .catch()

    connection.on("ReceiveNotification", (notification: Notification) => {
      console.log(notification)
      setMessage(notification)
    })

    return () => {
      connection.stop().then(() => console.log("Disconnected from SignalR hub"))
    }
  }, [connection])

  useEffect(() => {
    if (message) {
      toast({
        title: `${message?.title}`,
        description: `${message?.content}`,
        duration: 5000,
        color: "#ff4e3b",
      })
    }
  }, [message])

  return <></>
}

export default Notification
