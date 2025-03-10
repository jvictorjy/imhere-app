import {Alert, FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import { styles } from './styles';
import {Participant} from "../../components/Participant";
import {useState} from "react";

export function Home() {
    const [participants, setParticipants] = useState<string[]>([]);
    const [participantName, setParticipantName] = useState('');

    function handleParticipantAdd() {
        if (participants.includes(participantName)) {
            return Alert.alert('Participante existente', 'Já existe um participante na lista com esse nome')
        }

        setParticipants([...participants, participantName]);
        setParticipantName('');
    }

    function handleParticipantRemove(name : string) {
        Alert.alert('Remover', `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => setParticipants(participants.filter(participant => participant !== name))
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ]);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.eventName}>Evento</Text>
            <Text style={styles.eventDate}>Data do evento</Text>


            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor="#8D8D99"
                    onChangeText={setParticipantName}
                    value={participantName}
                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => (item)}
                renderItem={({item}) => (
                    <Participant
                        key={item}
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou ao evento ainda, adicione participantes a sua lista
                    </Text>
                )}
            />
        </View>
    )
}