import * as tf from '@tensorflow/tfjs';


class NeuralNetwork{


    constructor(model,inputnodes, hidden_nodes,outputnodes){


        if (model instanceof tf.Sequential) {
            this.model = model;
            this.inputnodes = inputnodes;
            this.hidden_nodes = hidden_nodes;
            this.outputnodes = outputnodes;

            return;
        }

        console.log("BUILDING BRAIN");


        this.inputnodes = inputnodes;
        this.hidden_nodes = hidden_nodes;
        this.outputnodes = outputnodes;
        this.model = this.createModel();


    }


    copy() {
        return tf.tidy(() => {
            const modelCopy = this.createModel();
            const weights = this.model.getWeights();
            const weightCopies = [];
            for (let i = 0; i < weights.length; i++) {
                weightCopies[i] = weights[i].clone();
            }
            modelCopy.setWeights(weightCopies);
            return new NeuralNetwork(
                modelCopy,
                this.inputnodes,
                this.hidden_nodes,
                this.outputnodes
            );
        });
    }


     createModel(){


         const model = tf.sequential();

         const  hidden = tf.layers.dense({
             units: this.hidden_nodes,
             inputShape: [this.inputnodes],
             activation: 'sigmoid'
         });
         model.add(hidden);
         const output = tf.layers.dense({
             units: this.outputnodes,
             activation: 'softmax'
         });
         model.add(output);
         return model;



     }

    predict(inputs) {
        return tf.tidy(() => {
            const xs = tf.tensor2d([inputs]);
            const ys = this.model.predict(xs);
            const outputs = ys.dataSync();
            // console.log(outputs);
            return outputs;
        });
    }

}

export {NeuralNetwork}


