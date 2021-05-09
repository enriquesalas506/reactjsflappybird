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

    mutate(rate,p5) {


        console.log("MUTATING BRAIN");

        tf.tidy(() => {
            const weights = this.model.getWeights();
            const mutatedWeights = [];
            for (let i = 0; i < weights.length; i++) {
                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();
                for (let j = 0; j < values.length; j++) {


                    if (p5.random(1) < rate) {


                        let w = values[j];

                        let changeValue = w + (p5.randomGaussian() * rate);

                        console.log("ORIGINAL VALUE " + values[j] + " MUTATION " + changeValue);


                        values[j] = changeValue;

                    }


                }
                let newTensor = tf.tensor(values, shape);
                mutatedWeights[i] = newTensor;
            }
            this.model.setWeights(mutatedWeights);
        });
    }

}

export {NeuralNetwork}


