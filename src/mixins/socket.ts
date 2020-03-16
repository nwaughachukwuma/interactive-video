
/**
 * Mixin for kafka client socket io
 * Read more here: https://github.com/probil/vue-socket.io-extended
 */
export const KafkaConnect: any = {
    mounted() {
        console.log('Kafka connect mixin bound success onmount')
        const payload = {name: 'Chuks Nwaugha'}
        try {
            // this.$socket.client.emit('event', payload);
            this.$socket.client.emit('stream_data', {...payload, email: 'nwaughac@gmail.com'});
        } catch (error) {
            console.log('error sending data to socket io', error)
        }
    
    },
    sockets: {
        connect(data: any) {
            // Fired when the socket connects.
            console.log('socket datas on connect', data);
        },
        reconnect(data: any) {
            console.log('socket data on reconnect', data);
        },
        disconnect() {
            // this.isConnected = false;
            console.log('socket connection closed');
        },
        broadcast(data: any) {
            console.log('onbroadcast :=>>>', data)
        },
        // eslint-disable-next-line
        broadcast_disconnect(data: any) {
            console.log('broadcast ondisconnect :=>>>', data)
        },
        // eslint-disable-next-line
        connect_message(data: any) {
            console.log('connect_message :=>>>', data)
        },
        // eslint-disable-next-line
        event_received(data: any) {
            console.log('event_received :=>>>', data)
        },
        // eslint-disable-next-line
        stream_response(data: any) {
            console.log('stream_response :=>>>', data)
        }
    }
}

export default KafkaConnect